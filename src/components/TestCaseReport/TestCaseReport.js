import React from "react";
import "./TestCaseReport.css";
import { Card, CardContent, IconButton, Menu, MenuItem } from "@mui/material";
import CustomDropdown from "../Dropdown/CustomDropdown";
import ReactTable from "../ReactTable/ReactTable";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { defaultDatePickerSlotPropsStyles, defaultDatePickerStyles, getFormattedDate, getFormattedDayJsDate } from "../../Utils";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PieChartComponent from "../PieChartComponent/PieChartComponent";
import { overflowStyles } from "../../Utils";

const dropdownCustomStyles = {
    margin: "10px",
    width: "200px"
};

const columns = [
    {
        id: "project",
        label: "Project",
        cellAlign: "center",
    },
    {
        id: "test_case_id",
        label: "Test Case ID",
        cellAlign: "center",
    },
    {
        id: "description",
        label: "Description",
        cellAlign: "center",
        cellStyles: {
            ...overflowStyles,
            maxWidth: "250px"
        }
    },
    {
        id: "failureReason",
        label: "Failure Reason",
        cellAlign: "center",
    },
    {
        id: "execution_status",
        label: "Status",
        cellAlign: "left",
        cellStyles: {
            paddingLeft: "2rem",
            width: "10%"
        }
    },
    {
        id: "execution_date",
        label: "Execution Date",
        cellAlign: "center",
    },
];

// const sampleProjectDropdownData = [
//     "All",
//     "Project1",
//     "Project2",
//     "Project3",
//     "Project4",
// ];

// const releaseDropdown = [
//     "All",
//     "Release1",
//     "Release2",
//     "Release3",
//     "Release4",
// ];

const testingDropdown = [
    "All",
    "Smoke Testing",
    "Sanity Testing",
    "Regression",
];

const tabs = [
    "Test Cases",
    "Test Case Report",
];

const TestCaseReport = () => {
    const [startDate, setStartDate] = React.useState(dayjs(new Date()));
    const [endDate, setEndDate] = React.useState(dayjs(new Date()));
    const [projectDropdown, setProjectDropdown] = React.useState(["All"]);
    const [environmentDropdown, setEnvironmentDropdown] = React.useState(["All"]);
    const [testingDropdown, setTestingDropdown] = React.useState(["All"]);
    const [testCaseData, setTestCaseData] = React.useState([]);
    const [currentTestCaseData, setCurrentTestCaseData] = React.useState([]);
    const [selectedProject, setSelectedProject] = React.useState("All");
    const [selectedEnvironment, setSelectedEnvironment] = React.useState("All");
    const [selectedTesting, setSelectedTesting] = React.useState("All");
    const [selectedMenuRowIndex, setSelectedMenuRowIndex] = React.useState(null);
    const [selectedTab, setSelectedTab] = React.useState(tabs[0]);
    const [pieChartData, setPieChartData] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openAssignDefectMenu = Boolean(anchorEl);
    const handleAssignDefectMenuClick = (event, rowIndex) => {
        setAnchorEl(event.currentTarget);
        setSelectedMenuRowIndex(rowIndex);
    };
    const handleClose = (selectedMenu) => {
        setAnchorEl(null);
        if (selectedMenu === "Assign Defect") {
            // Assign Defect API Logic goes here
        }
    };

    React.useEffect(() => {
        const dropdownAPIURL = "/sampleProjectData.json";
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

        const environmentAPIURL = "/sampleEnvironmentData.json";
        fetch(environmentAPIURL)
            .then(res => res.json())
            .then(jsonData => {
                console.log(jsonData);
                if (jsonData) {
                    const environmentDropdownData = jsonData.map((json) => json.name);
                    setEnvironmentDropdown([...environmentDropdown, ...environmentDropdownData]);
                }
            })
            .catch(err => {
                console.log("Error while fetching dropdown:", err);
            })

        const testingAPIURL = "/sampleEnvironmentData.json";
        fetch(testingAPIURL)
            .then(res => res.json())
            .then(jsonData => {
                console.log(jsonData);
                if (jsonData) {
                    const testingDropdownData = jsonData.map((json) => json.name);
                    setTestingDropdown([...testingDropdown, ...testingDropdownData]);
                }
            })
            .catch(err => {
                console.log("Error while fetching dropdown:", err);
            })
        // eslint-disable-next-line
    }, [])

    React.useEffect(() => {
        const testCaseAPIURL = "/sampleTestCaseData.json";
        fetch(testCaseAPIURL)
            .then(res => res.json())
            .then(jsonData => {
                console.log("API DATA", jsonData);
                if (jsonData) {
                    const testCaseData = [];
                    jsonData.forEach((testCase, index) => {
                        testCaseData.push({
                            project: testCase.project ? testCase.project.description : null,
                            test_case_id: testCase.testCaseId,
                            description: testCase.description,
                            failureReason: testCase.failureReason ? testCase.failureReason.name : null,
                            executionStatus: testCase.executionStatus,
                            environment: testCase.environment.name,
                            execution_status: (
                                <>
                                    <span
                                        style={{
                                            color: testCase.executionStatus === "PASSED" ? "green" : "red",
                                            fontWeight: "600"
                                        }}
                                    >
                                        {testCase.executionStatus}
                                    </span>
                                    {
                                        testCase.executionStatus === "FAILED" && (
                                            <>
                                                <IconButton
                                                    id="assign-defect-menu-button"
                                                    sx={{ padding: "3px" }}
                                                    onClick={(event) => handleAssignDefectMenuClick(event, index)}
                                                    aria-controls={openAssignDefectMenu ? 'assign-defect-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={openAssignDefectMenu ? 'true' : undefined}
                                                >
                                                    <MoreVertIcon />
                                                </IconButton>
                                                <Menu
                                                    id="assign-defect-menu"
                                                    anchorEl={anchorEl}
                                                    open={openAssignDefectMenu && index === selectedMenuRowIndex}
                                                    onClose={handleClose}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'assign-defect-menu-button',
                                                    }}
                                                >
                                                    <MenuItem onClick={() => handleClose("Assign Defect")}>Assign Defect</MenuItem>
                                                </Menu>
                                            </>
                                        )
                                    }
                                </>
                            ),
                            executionDate: testCase.executionDate,
                            execution_date: getFormattedDate(testCase.executionDate.split(".")[0]),
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
    }, [anchorEl])

    React.useEffect(() => {
        updatePieChartData();
        // eslint-disable-next-line
    }, [currentTestCaseData])

    const updatePieChartData = () => {
        const passedTestCases = currentTestCaseData.filter((testCase) => {
            return testCase.executionStatus === "PASSED"
        });
        const failedTestCases = currentTestCaseData.filter((testCase) => {
            return testCase.executionStatus === "FAILED"
        });
        const pieChartData = [
            { name: 'Passed', value: passedTestCases.length },
            { name: 'Failed', value: failedTestCases.length },
        ];
        setPieChartData(pieChartData);
    };

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
        else if (id === "environment") {
            setSelectedEnvironment(value);
            if (value === "All") {
                setCurrentTestCaseData(testCaseData);
            }
            else {
                console.log("267",testCaseData)
                const filteredData = testCaseData.filter((testCase) => {
                    return testCase.environment === value
                });
                setCurrentTestCaseData(filteredData);
            }
        }
        else if (id === "testing") {
            setSelectedTesting(value);
        }
    }

    const handleFilterDataByDate = (dateId, startDate, endDate) => {
        dateId === "startDate" && setStartDate(startDate);
        dateId === "endDate" && setEndDate(endDate);
        const formattedStartDate = getFormattedDayJsDate(startDate);
        const formattedEndDate = getFormattedDayJsDate(endDate);

        const filteredData = [];
        testCaseData.forEach((testCase) => {
            const executionDate = new Date(testCase.executionDate);
            const selectedStartDate = new Date(formattedStartDate);
            const selectedEndDate = new Date(formattedEndDate);
            if (executionDate > selectedStartDate && executionDate < selectedEndDate) {
                filteredData.push(testCase);
            }
        })

        setCurrentTestCaseData(filteredData);
    };

    const renderTabs = () => {
        return (
            <div className="tabs">
                {
                    tabs.map((tab, index) => {
                        return (
                            <button
                                key={index}
                                className={`tab-button ${selectedTab === tab ? "active-tab" : null}`}
                                onClick={() => {
                                    setSelectedTab(tab);
                                }}
                            >
                                {tab}
                            </button>
                        )
                    })
                }
            </div>
        )
    };

    const renderTestCases = () => {
        return (
            <>
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
                            label="Environment"
                            placeholder="Select Environment"
                            names={environmentDropdown}
                            value={selectedEnvironment}
                            onChange={(value) => {
                                handleDropdownChange("environment", value);
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
                                onChange={(newValue) => handleFilterDataByDate("startDate", newValue, endDate)}
                                sx={defaultDatePickerStyles}
                                slotProps={defaultDatePickerSlotPropsStyles}
                            />
                            <DatePicker
                                label="End Date"
                                value={endDate}
                                onChange={(newValue) => handleFilterDataByDate("endDate", startDate, newValue)}
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
            </>
        )
    };

    const renderTestCaseReport = () => {
        return (
            <>
                <div style={{
                    position: "fixed",
                    // display: "flex",
                    // justifyContent: "center",
                    // alignItems: "center",
                    // borderBottom: "2px solid lightgray"
                }}>
                    <CustomDropdown
                        label="Project"
                        placeholder="Select Project"
                        names={projectDropdown}
                        defaultValue="All"
                        onChange={(value) => {
                            if (value !== "All") {
                                const passedTestCases = currentTestCaseData.filter((testCase) => {
                                    return testCase.executionStatus === "PASSED" && testCase.project === value
                                });
                                const failedTestCases = currentTestCaseData.filter((testCase) => {
                                    return testCase.executionStatus === "FAILED" && testCase.project === value
                                });
                                const pieChartData = [
                                    { name: 'Passed', value: passedTestCases.length },
                                    { name: 'Failed', value: failedTestCases.length },
                                ];
                                setPieChartData(pieChartData);
                            }
                            else {
                                updatePieChartData();
                            }
                        }}
                        customStyles={dropdownCustomStyles}
                    />
                </div>
                <div>
                    <PieChartComponent data={pieChartData} />
                </div>
            </>
        )
    };

    return (
        <>
            {renderTabs()}
            {selectedTab === tabs[0] && renderTestCases()}
            {selectedTab === tabs[1] && renderTestCaseReport()}
        </>
    )
};

export default TestCaseReport;