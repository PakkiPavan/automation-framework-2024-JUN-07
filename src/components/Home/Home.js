import React from "react";
import { Card, CardContent } from "@mui/material";
import CustomDropdown from "../Dropdown/CustomDropdown";
import ReactTable from "../ReactTable/ReactTable";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Header from "../Header/Header";

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

const projectDropdown = [
    "Project1",
    "Project2",
    "Project3",
    "Project4",
];

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

const Home = () => {
    const [startDate, setStartDate] = React.useState(dayjs('2022-04-17'));

    return (
        <>
            <Header />
            <Card>
                <CardContent sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center"
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
                        sx={{
                            ".MuiFormControl-root":{
                                width: "200px"
                            }
                        }}
                        />
                        <DatePicker
                            label="End Date"
                            value={startDate}
                        // onChange={(newValue) => setValue(newValue)}
                        />
                    </LocalizationProvider>
                </CardContent>
            </Card>
            <div>
                <ReactTable
                    columns={columns}
                    data={data}
                />
            </div>
        </>
    )
};

export default Home;