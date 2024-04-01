import React from 'react';
import "./ManagePlatforms.css";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { getId, getName, isNullOrEmpty } from '../../Utils';

const defaultButtonStyles = {
    padding: "3px",
    textTransform: "initial",
};

const defaultIconButtonStyles = {
    border: "1px solid lightgray",
    borderRadius: "0",
    padding: "5px",
    margin: "3px 3px"
};

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        margin: "7px 4px",
        marginLeft: theme.spacing(1),
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: "10px 10px",
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


const ManagePlatforms = () => {
    const [platforms, setPlatforms] = React.useState({});
    const [showPlatformDialog, setShowPlatformDialog] = React.useState(false);
    const [showApplicationDialog, setShowApplicationDialog] = React.useState(false);
    const [platform, setPlatform] = React.useState("");
    const [application, setApplication] = React.useState("");
    const [fieldError, setFieldError] = React.useState(false);
    const [isEditMode, setIsEditMode] = React.useState(false);
    const [recordToEdit, setRecordToEdit] = React.useState(null);
    const [showAlert, setShowAlert] = React.useState({
        open: false,
        message: ""
    });

    const getPlatforms = () => {
        const dropdownAPIURL = "/samplePlatformsData.json";
        fetch(dropdownAPIURL)
            .then(res => res.json())
            .then(jsonData => {
                // console.log(jsonData);
                if (jsonData) {
                    const platforms = {};
                    jsonData.forEach(obj => {
                        const platformName = `${obj.platform.name}_${obj.platform.id}`;
                        if (!platforms[platformName]) {
                            platforms[platformName] = [];
                        }
                        platforms[platformName].push(`${obj.name}_${obj.id}`);
                    });
                    console.log("platforms", platforms)
                    setPlatforms(platforms);
                }
            })
            .catch(err => {
                console.log("Error while fetching platforms:", err);
            })
    };

    React.useEffect(() => {
        getPlatforms();
    }, [])

    const handleManagePlatform = async (action, platform) => {
        console.log("handleManagePlatform", action)
        if (action === "EDIT") {
            // Edit platform
            const platformName = getName(platform);
            setPlatform(platformName);
            setRecordToEdit(platform);
            setIsEditMode(true);
            setShowPlatformDialog(true);
        }
        else if (action === "DELETE") {
            // Delete platform
        }
    };

    const renderPlatformActions = (platform) => {
        return (
            <>
                <IconButton
                    disableRipple
                    sx={defaultIconButtonStyles}
                    onClick={(event) => {
                        event.stopPropagation();
                        handleManagePlatform("EDIT", platform)
                    }}
                >
                    <EditIcon sx={{
                        color: "#1565c0"
                    }} />
                </IconButton>
                <IconButton
                    disableRipple
                    sx={defaultIconButtonStyles}
                    onClick={(event) => {
                        event.stopPropagation();
                        handleManagePlatform("DELETE", platform)
                    }}
                >
                    <DeleteIcon sx={{
                        color: "red"
                    }} />
                </IconButton>
            </>
        )
    };

    const handleManageApplication = (action, platform, application) => {
        if (action === "EDIT") {
            // Edit application
            setPlatform(platform);
            setRecordToEdit({
                platform,
                application,
            });
            setIsEditMode(true);
            const applicationName = getName(application);
            setApplication(applicationName);
            setShowApplicationDialog(true);
        }
        else if (action === "DELETE") {
            // Delete application
        }
    };

    const renderApplicationActions = (platform, application) => {
        return (
            <>
                <IconButton
                    disableRipple
                    sx={defaultIconButtonStyles}
                    onClick={() => handleManageApplication("EDIT", platform, application)}
                >
                    <EditIcon sx={{
                        color: "#1565c0"
                    }} />
                </IconButton>
                <IconButton
                    disableRipple
                    sx={defaultIconButtonStyles}
                    onClick={() => handleManageApplication("DELETE", platform, application)}
                >
                    <DeleteIcon sx={{
                        color: "red"
                    }} />
                </IconButton>
            </>
        )
    };

    const handleAddPlatform = () => {
        setPlatform("");
        setShowPlatformDialog(true);
    };

    const handleAddApplicationToPlatform = (platform) => {
        setApplication("");
        setShowApplicationDialog(true);
        setPlatform(platform);
    };

    const handleClosePlatformDialog = () => {
        setShowPlatformDialog(false);
        setFieldError(false);
        setIsEditMode(false);
    };

    const handleSubmitPlatform = async () => {
        console.log("handleSubmitPlatform", platform);

        if (isNullOrEmpty(platform)) {
            setFieldError(true);
            return;
        }
        setFieldError(false);

        try {
            const API_URL = "http://10.103.50.166:8090/api/platforms";
            const body = {
                id: isEditMode ? getId(recordToEdit) : Object.keys(platforms).length + 1,
                name: platform
            };
            const addPlatformResponse = await fetch(API_URL, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await addPlatformResponse.json();
            console.log("ADD PLAFORM RESPONSE", data);
            setShowAlert({
                open: true,
                message: `Platform ${isEditMode ? "updated" : "added"} successfully!`,
                severity: "success"
            });
        }
        catch (err) {
            console.log(`Failed to ${isEditMode ? "update" : "add"} platform:`, err);
        }
        finally {
            handleClosePlatformDialog();
            getPlatforms();
        }
    }

    const renderPlatformDialog = () => {
        return (
            <>
                <Dialog
                    open={showPlatformDialog}
                    onClose={handleClosePlatformDialog}
                >
                    <DialogTitle>
                        Add Platform
                    </DialogTitle>
                    <DialogContent
                        dividers
                        sx={{
                            padding: "4rem"
                        }}
                    >
                        <TextField
                            id="platformName"
                            label="Platform Name"
                            variant="outlined"
                            value={platform}
                            onChange={(event) => setPlatform(event.target.value)}
                            sx={{
                                ".MuiOutlinedInput-notchedOutline": {
                                    borderColor: fieldError ? `red` : "initial"
                                }
                            }}
                        />

                    </DialogContent>
                    <DialogActions sx={{ justifyContent: "center" }}>
                        <Button
                            autoFocus
                            variant="outlined"
                            sx={defaultButtonStyles}
                            onClick={handleClosePlatformDialog}
                        >
                            Cancel
                        </Button>
                        <Button
                            autoFocus
                            variant="contained"
                            sx={defaultButtonStyles}
                            onClick={handleSubmitPlatform}
                        >
                            {isEditMode ? "Update" : "Submit"}
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    };

    const handleCloseApplicationDialog = () => {
        setShowApplicationDialog(false);
        setFieldError(false);
        setIsEditMode(false);
    };

    const handleSubmitApplication = async () => {
        console.log("handleSubmitApplication", platform, application);
        if (isNullOrEmpty(application)) {
            setFieldError(true);
            return;
        }
        setFieldError(false);

        try {
            const API_URL = "http://10.103.50.166:8090/api/applications";
            const body = {
                id: isEditMode ? getId(recordToEdit.application) : platforms[platform].length + 1,
                name: application,
                platform: {
                    id: getId(platform),
                    name: getName(platform)
                }
            };
            console.log("ADD APPLICAITON BODY", body);
            const addApplicationResponse = await fetch(API_URL, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await addApplicationResponse.json();
            console.log("ADD APPLICATION RESPONSE", data);
            setShowAlert({
                open: true,
                message: `Application ${isEditMode ? "updated" : "added"} successfully!`,
                severity: "success"
            });
        }
        catch (err) {
            console.log(`Failed to ${isEditMode ? "update" : "add"} application to platform:`, err);
        }
        finally {
            handleCloseApplicationDialog();
            getPlatforms();
        }
    };

    const renderApplicationDialog = () => {
        return (
            <>
                <Dialog
                    open={showApplicationDialog}
                    onClose={handleCloseApplicationDialog}
                >
                    <DialogTitle>
                        Add Application
                    </DialogTitle>
                    <DialogContent
                        dividers
                        sx={{
                            padding: "4rem",
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        <div style={{ marginBottom: "1rem" }}>
                            <b>Platform:</b> {getName(platform)}
                        </div>
                        <div>
                            <TextField
                                id="applicationName"
                                label="Application Name"
                                variant="outlined"
                                value={application}
                                onChange={(event) => setApplication(event.target.value)}
                                sx={{
                                    ".MuiOutlinedInput-notchedOutline": {
                                        borderColor: fieldError ? `red` : "initial"
                                    }
                                }}
                            />
                        </div>

                    </DialogContent>
                    <DialogActions sx={{ justifyContent: "center" }}>
                        <Button
                            autoFocus
                            variant="outlined"
                            sx={defaultButtonStyles}
                            onClick={handleCloseApplicationDialog}
                        >
                            Cancel
                        </Button>
                        <Button
                            autoFocus
                            variant="contained"
                            sx={defaultButtonStyles}
                            onClick={handleSubmitApplication}
                        >
                            {isEditMode ? 'Update' : 'Submit'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowAlert({
            open: false,
            message: ""
        });
    };

    const renderAlert = () => {
        return (
            <Snackbar
                open={showAlert.open}
                autoHideDuration={6000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseAlert}
                    severity={showAlert.severity ? showAlert.severity : "info"}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {showAlert.message}
                </Alert>
            </Snackbar>
        )
    }

    return (
        <>
            {showPlatformDialog && renderPlatformDialog()}
            {showApplicationDialog && renderApplicationDialog()}
            {renderAlert()}
            <div className='platforms-container'>
                <Button
                    variant='contained' sx={{
                        ...defaultButtonStyles,
                        width: "fit-content",
                        alignSelf: "end",
                        marginBottom: "10px"
                    }}
                    onClick={() => handleAddPlatform()}
                >
                    <AddIcon />
                    Add Platform
                </Button>
                {
                    Object.keys(platforms).map((platform, index1) => {
                        const applications = platforms[platform];
                        return (
                            <div key={`platform-${index1}`}>
                                <Accordion>
                                    <AccordionSummary>
                                        <div>
                                            {getName(platform)}
                                        </div>
                                        <div>
                                            {renderPlatformActions(platform)}
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div style={{
                                            textAlign: "end",
                                            marginBottom: "5px"
                                        }}>
                                            <Button
                                                variant='contained' sx={defaultButtonStyles}
                                                onClick={() => handleAddApplicationToPlatform(platform)}
                                            >
                                                <AddIcon />
                                                Add Application
                                            </Button>
                                        </div>
                                        {
                                            applications.length > 0 ? (
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>Application Name</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {applications.map((application, index2) => {
                                                            return (
                                                                <tr key={`platform-application-${index1}${index2}`}>
                                                                    <td>{getName(application)}</td>
                                                                    <td>{renderApplicationActions(platform, application)}</td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            ) : "No Application Found"
                                        }
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
};

export default ManagePlatforms;