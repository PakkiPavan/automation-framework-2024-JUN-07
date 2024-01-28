import { Alert, Button, Card, CardContent, Snackbar, TextField } from "@mui/material";
import React from "react";
import { defaultTextfieldStyles } from "../../Utils";

const testUserName = "admin";
const testPassword = "admin";

export default function Login(props) {
    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showAlert, setShowAlert] = React.useState({
        open: false,
        message: ""
    });

    const handleLogin = () => {
        if (!userName) {
            setShowAlert({
                open: true,
                message: "UserName is required",
                severity: "error"
            });
            return;
        }
        if (!password) {
            setShowAlert({
                open: true,
                message: "Password is required",
                severity: "error"
            });
            return;
        }

        if (userName !== testUserName && password !== testPassword) {
            setShowAlert({
                open: true,
                message: "Invalid Username or Password",
                severity: "error"
            });
            return;
        }

        props.setIsLoggedIn(true);
    };

    const handleClose = (event, reason) => {
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
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleClose}
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
            {renderAlert()}
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "linear-gradient(-135deg,#c850c0,#4158d0)"
            }}>
                <Card sx={{
                    width: "400px"
                }}>
                    <CardContent sx={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "center",
                        alignItems: "center",
                        gap: "10px"
                    }}>
                        <div style={{
                            fontSize: "16px",
                            fontWeight: "600"
                        }}>
                            LOGIN
                        </div>
                        <div>
                            <TextField
                                label="Username"
                                variant="outlined"
                                value={userName}
                                onChange={(event) => setUserName(event.target.value)}
                                sx={defaultTextfieldStyles}
                                onKeyDown={(event)=>{
                                    if(event.key === "Enter"){
                                        handleLogin();
                                    }
                                }}
                            />
                        </div>
                        <div>
                            <TextField
                                type="password"
                                label="Password"
                                variant="outlined"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                sx={defaultTextfieldStyles}
                                onKeyDown={(event)=>{
                                    if(event.key === "Enter"){
                                        handleLogin();
                                    }
                                }}
                            />
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                onClick={handleLogin}
                            >
                                LOGIN
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
} 