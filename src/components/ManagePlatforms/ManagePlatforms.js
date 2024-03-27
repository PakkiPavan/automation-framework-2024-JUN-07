import React from 'react';
import "./ManagePlatforms.css";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

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
    const [platforms, setPlatforms] = React.useState([]);

    React.useEffect(() => {
        const dropdownAPIURL = "/samplePlatformsData.json";
        fetch(dropdownAPIURL)
            .then(res => res.json())
            .then(jsonData => {
                // console.log(jsonData);
                if (jsonData) {
                    const platforms = [];
                    jsonData.forEach(obj => {
                        const platformName = obj.platform.name;
                        if (!platforms[platformName]) {
                            platforms[platformName] = [];
                        }
                        platforms[platformName].push(obj.name);
                    });
                    console.log("platforms", platforms)
                    setPlatforms(platforms);
                }
            })
            .catch(err => {
                console.log("Error while fetching platforms:", err);
            })
    }, [])

    const handleManagePlatform = (action, platform) => {
        if (action === "EDIT") {
            // Edit platform
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
                        color: "blue"
                    }} />
                </IconButton>
                <IconButton
                    disableRipple
                    sx={defaultIconButtonStyles}
                    onClick={(event) => {
                        event.stopPropagation();
                        handleManagePlatform("DELETE", platform)
                    }
                    }
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
                        color: "blue"
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

    };

    const handleAddApplicationToPlatform = (platform) => {

    };

    return (
        <>
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
                                            {platform}
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
                                                    {applications.map((application, index2) => {
                                                        return (
                                                            <tr key={`platform-application-${index1}${index2}`}>
                                                                <td>{application}</td>
                                                                <td>{renderApplicationActions(platform, application)}</td>
                                                            </tr>
                                                        )
                                                    })}
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