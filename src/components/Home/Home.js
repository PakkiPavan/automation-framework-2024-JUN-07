import React from "react";
import { Card, CardContent, Toolbar } from "@mui/material";
import CustomDropdown from "../Dropdown/CustomDropdown";
import ReactTable from "../ReactTable/ReactTable";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Header from "../Header/Header";
import { defaultDatePickerSlotPropsStyles, defaultDatePickerStyles } from "../../Utils";
import Footer from "../Footer/Footer";

const columns = [
    {
        id: "project",
        label: "Project",
        width: "10%",
        cellAlign: "center",
    },
    {
        id: "testCaseId",
        label: "Test Case ID",
        width: "10%",
        cellAlign: "center",
    },
    {
        id: "description",
        label: "Description",
        cellAlign: "center",
    },
    {
        id: "status",
        label: "Status",
        width: "20%",
        cellAlign: "center",
    },
];
const data = [
    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },
    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },
    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },
    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },

    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },
    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },
    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },
    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },

    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },
    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },
    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },
    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },

    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },
    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },
    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },
    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },

    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },
    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },
    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },
    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },

    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },
    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },
    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },
    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },

    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },
    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },
    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },
    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },

    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },
    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },
    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },
    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },

    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },
    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },
    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },
    {
        project: "Project1",
        testCaseId: "TC001",
        description: "Some Test Case Description Some Test Case Description",
        status: "Running"
    },


];

// const projectDropdown = [
//     "Project1",
//     "Project2",
//     "Project3",
//     "Project4",
// ];

const releaseDropdown = [
    "Release1",
    "Release2",
    "Release3",
    "Release4",
];

const testingDropdown = [
    "Smoke Testing",
    "Sanity Testing",
    "Regression",
];

const Home = (props) => {
    // eslint-disable-next-line
    const [startDate, setStartDate] = React.useState(dayjs('2022-04-17'));
    const [projectDropdown, setProjectDropdown] = React.useState([]);

    React.useEffect(() => {
        const dropdownAPIURL = "";
        fetch(dropdownAPIURL)
            .then(res => res.json())
            .then(jsonData => {
                console.log(jsonData);
                if (jsonData) {
                    const projectDropdownData = jsonData.map((json) => json.description);
                    setProjectDropdown(projectDropdownData);
                }
            })
            .catch(err => {
                console.log("Error while fetching dropdown:", err);
            })
    })

    return (
        <div style={{
            minHeight: "100%",
            position: "relative"
        }}>
            <Toolbar sx={{
                minHeight: "48px !important",
            }} />
            <Header setIsLoggedIn={props.setIsLoggedIn} />
            {/* Content */}
            <div style={{
                paddingBottom: "100px",
            }}>
                <Card sx={{
                    margin: "10px"
                }}>
                    <CardContent sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        padding: "10px",
                        ":last-child": {
                            paddingBottom: "10px !important",
                        }
                    }}>
                        <CustomDropdown
                            placeholder="Select Project"
                            names={projectDropdown}
                        />
                        <CustomDropdown
                            placeholder="Select Release"
                            names={releaseDropdown}
                        />
                        <CustomDropdown
                            placeholder="Select Testing"
                            names={testingDropdown}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Start Date"
                                value={startDate}
                                // onChange={(newValue) => setValue(newValue)}
                                sx={defaultDatePickerStyles}
                                slotProps={defaultDatePickerSlotPropsStyles}
                            />
                            <DatePicker
                                label="End Date"
                                value={startDate}
                                // onChange={(newValue) => setValue(newValue)}
                                sx={defaultDatePickerStyles}
                                slotProps={defaultDatePickerSlotPropsStyles}
                            />
                        </LocalizationProvider>
                    </CardContent>
                </Card>
                <Card
                    sx={{
                        margin: "10px"
                    }}
                >
                    <CardContent
                        sx={{
                            padding: "0",
                            ":last-child": {
                                paddingBottom: "0 !important",
                            }
                        }}
                    >
                        <ReactTable
                            columns={columns}
                            data={data}
                        />
                    </CardContent>
                </Card>
            </div>
            {/* Footer */}
            <Footer />
        </div>
    )
};

export default Home;