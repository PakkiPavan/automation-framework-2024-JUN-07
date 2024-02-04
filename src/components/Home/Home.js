import React from "react";
import { Toolbar } from "@mui/material";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import TestCaseReport from "../TestCaseReport/TestCaseReport";

const Home = (props) => {

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
                <TestCaseReport />
            </div>
            {/* Footer */}
            <Footer />
        </div>
    )
};

export default Home;