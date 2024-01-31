import React from "react";
import { Card, CardContent, Toolbar } from "@mui/material";
import CustomDropdown from "../Dropdown/CustomDropdown";
import ReactTable from "../ReactTable/ReactTable";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Header from "../Header/Header";
import { defaultDatePickerSlotPropsStyles, defaultDatePickerStyles, getFormattedDate } from "../../Utils";
import Footer from "../Footer/Footer";

const dropdownCustomStyles = {
    margin: "10px",
    width: "200px"
};

const columns = [
    {
        id: "project",
        label: "Project",
        width: "10%",
        cellAlign: "center",
    },
    {
        id: "test_case_id",
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
        id: "failureReason",
        label: "Failure Reason",
        cellAlign: "center",
    },
    {
        id: "execution_status",
        label: "Status",
        width: "10%",
        cellAlign: "center",
    },
    {
        id: "execution_date",
        label: "Execution Date",
        width: "10%",
        cellAlign: "center",
    },
];
const generateSampleTestCaseData = () => {
    const testCaseData = [];
    for (let i = 0; i < 30; i++) {
        testCaseData.push({
            project: "Project1",
            test_case_id: `ETE-${1000 + i}`,
            description: "Some Test Case Description Some Test Case Description",
            failureReason: (
                <a href="https://ocbc.com" target="_blank" rel="noreferrer">
                    SessionNotCreatedException
                </a>
            ),
            execution_status: "PASSED",
            execution_date: getFormattedDate("2023-11-01T19:00:11.000+00:00"),
        });
    }
    return testCaseData;
}
const sampleTestCaseData = generateSampleTestCaseData();

// const projectDropdown = [
//     "All",
//     "Project1",
//     "Project2",
//     "Project3",
//     "Project4",
// ];

const releaseDropdown = [
    "All",
    "Release1",
    "Release2",
    "Release3",
    "Release4",
];

const testingDropdown = [
    "All",
    "Smoke Testing",
    "Sanity Testing",
    "Regression",
];

const Home = (props) => {
    // eslint-disable-next-line
    const [startDate, setStartDate] = React.useState(dayjs('2022-04-17'));
    const [endDate, setEndDate] = React.useState(dayjs('2022-04-17'));
    const [projectDropdown, setProjectDropdown] = React.useState(["All"]);
    const [testCaseData, setTestCaseData] = React.useState(sampleTestCaseData);
    const [currentTestCaseData, setCurrentTestCaseData] = React.useState(sampleTestCaseData);
    const [selectedProject, setSelectedProject] = React.useState("All");
    const [selectedRelease, setSelectedRelease] = React.useState("All");
    const [selectedTesting, setSelectedTesting] = React.useState("All");

    React.useEffect(() => {
        const dropdownAPIURL = "";
        fetch(dropdownAPIURL)
            .then(res => res.json())
            .then(jsonData => {
                console.log(jsonData);
                if (jsonData) {
                    const projectDropdownData = jsonData.map((json) => json.description);
                    setProjectDropdown([...projectDropdown, ...projectDropdownData]);
                }
            })
            .catch(err => {
                console.log("Error while fetching dropdown:", err);
            })

        const testCaseAPIURL = "";
        fetch(testCaseAPIURL)
            .then(res => res.json())
            .then(jsonData => {
                console.log(jsonData);
                if (jsonData) {
                    const testCaseData = [];
                    jsonData.forEach((testCase) => {
                        testCaseData.push({
                            project: testCase.project.description,
                            test_case_id: testCase.test_case_id,
                            description: testCase.description,
                            failureReason: (
                                <a href="https://ocbc.com" target="_blank" rel="noreferrer">{testCase.failureReason.name}</a>
                            ),
                            execution_status: testCase.execution_status,
                            execution_date: getFormattedDate(testCase.execution_date),
                        })
                    })

                    setTestCaseData(testCaseData);
                    setCurrentTestCaseData(testCaseData);
                }
            })
            .catch(err => {
                console.log("Error while fetching test case data:", err);
            })
        // eslint-disable-next-line
    }, [])

    const handleDropdownChange = (id, value) => {
        if (id === "project") {
            setSelectedProject(value);
            if (value === "All") {
                setCurrentTestCaseData(testCaseData);
            }
            else {
                const filteredData = testCaseData.filter((testCase) => {
                    return testCase.project === value
                });
                setCurrentTestCaseData(filteredData);
            }
        }
        else if (id === "release") {
            setSelectedRelease(value);
        }
        else if (id === "testing") {
            setSelectedTesting(value);
        }
    }

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
                            label="Project"
                            placeholder="Select Project"
                            names={projectDropdown}
                            value={selectedProject}
                            onChange={(value) => {
                                handleDropdownChange("project", value);
                            }}
                            customStyles={dropdownCustomStyles}
                        />
                        <CustomDropdown
                            label="Release"
                            placeholder="Select Release"
                            names={releaseDropdown}
                            value={selectedRelease}
                            onChange={(value) => {
                                handleDropdownChange("release", value);
                            }}
                            customStyles={dropdownCustomStyles}
                        />
                        <CustomDropdown
                            label="Testing"
                            placeholder="Select Testing"
                            names={testingDropdown}
                            value={selectedTesting}
                            onChange={(value) => {
                                handleDropdownChange("testing", value);
                            }}
                            customStyles={dropdownCustomStyles}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Start Date"
                                value={startDate}
                                onChange={(newValue) => setStartDate(newValue)}
                                sx={defaultDatePickerStyles}
                                slotProps={defaultDatePickerSlotPropsStyles}
                            />
                            <DatePicker
                                label="End Date"
                                value={endDate}
                                onChange={(newValue) => setEndDate(newValue)}
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
                            data={currentTestCaseData}
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