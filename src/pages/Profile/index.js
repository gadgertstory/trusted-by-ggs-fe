import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";

const Profile = () => {
    const { user: currentUser } = useSelector((state) => state.auth);

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return (
        <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={6}>
                <Paper
                    sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        lineHeight: "3rem",
                    }}
                >
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Avatar
                            src="/static/images/avatar/2.jpg"
                            sx={{
                              backgroundColor: (theme) => theme.palette.secondary.light,
                                width: 100,
                                height: 100,
                            }}
                        />

                        <Typography variant="h4" component="h4" sx={{ mt: 2 }}>
                            Profile
                        </Typography>
                    </Grid>
                    <Typography variant="p">
                        <strong>Name:</strong> {currentUser.data.name}
                    </Typography>
                    <Typography variant="p">
                        <strong>Email:</strong> {currentUser.data.email}
                    </Typography>
                    <Typography variant="p">
                        <strong>Role:</strong> {currentUser.data.role}
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Profile;
