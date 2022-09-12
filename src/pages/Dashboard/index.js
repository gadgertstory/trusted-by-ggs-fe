import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import { getDashboard } from "../../services/actions/dashboard";

import { theme } from "../../assets/theme";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const { countRepair } = useSelector((state) => state.dashboard);

    useEffect(() => {
        dispatch(getDashboard());
    }, [dispatch]);

    return (
        <React.Fragment>
            <Typography
                variant="h3"
                component="h3"
                sx={{ my: 8, fontWeight: "bold" }}
            >
                สวัสดี, {currentUser.data.name.toUpperCase()} 👋🏻
            </Typography>
            <Typography variant="h5" sx={{ my: 2, fontWeight: "bold" }}>
                จำนวนใบแจ้งซ่อม
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Link href="/repair?status_no=0&customer_name=" underline="none">
                        <Paper
                            elevation={3}
                            sx={{
                                p: 2,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                height: 240,
                                borderTop: `solid ${theme.palette.indigo[500]} 4px`,
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    mb: 2,
                                    color: `${theme.palette.indigo[500]}`,
                                }}
                            >
                                ทั้งหมด
                            </Typography>
                            <Typography
                                variant="h1"
                                sx={{
                                    mb: 2,
                                    color: `${theme.palette.indigo[500]}`,
                                }}
                            >
                                {countRepair?.count_all}
                            </Typography>
                        </Paper>
                    </Link>
                </Grid>
                {countRepair?.count_status?.map((item) => {
                    const getColor = () => {
                        if (item.status_name === "แจ้งซ่อม") {
                            return theme.palette.amber[900];
                        } else if (item.status_name === "กำลังดำเนินการ") {
                            return theme.palette.lightBlue[400];
                        } else {
                            return theme.palette.teal[500];
                        }
                    };

                    const getUrl = () => {
                        if (item.status_id === 1) {
                            return "/repair?status_no=1&customer_name=";
                        } else if (item.status_id === 2) {
                            return "/repair?status_no=2&customer_name=";
                        } else {
                            return "/repair?status_no=9&customer_name=";
                        }
                    };

                    return (
                        <Grid item xs={12} md={3} key={item.status_id}>
                            <Link href={getUrl()} underline="none">
                                <Paper
                                    elevation={3}
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: 240,
                                        borderTop: `solid ${getColor()} 4px`,
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        sx={{ mb: 2, color: `${getColor()}` }}
                                    >
                                        {item.status_name}
                                    </Typography>
                                    <Typography
                                        variant="h1"
                                        sx={{ mb: 2, color: `${getColor()}` }}
                                    >
                                        {item.count_status}
                                    </Typography>
                                </Paper>
                            </Link>
                        </Grid>
                    );
                })}
            </Grid>
        </React.Fragment>
    );
};

export default Dashboard;
