import { Card, CardContent } from "@mui/material";

export default function Footer() {
    return (
        <>
            <Card sx={{
                backgroundColor: "#000",
                color: "#fff",
                borderRadius: "0",
                marginTop: "auto",
                position: "absolute",
                // bottom: "0",
                left: "0",
                height: "100px",
                width: "100%"
            }}>
                <CardContent sx={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                }}>
                    <div style={{
                        position: "absolute",
                        left: "1rem"
                    }}>
                        LOGO
                    </div>
                    <div>
                        <div>Contact Us</div>
                        <div>&copy; 2024 companywebsite.com. All Rights Reserved</div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}