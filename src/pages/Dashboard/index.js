import React,{useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";

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
            <Typography variant="h3" component="h3" sx={{ mb: 2 }}>
                สวัสดี, {currentUser.data.name.toUpperCase()}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Link href="/repair" underline="none">
                        <Paper
                            elevation={3}
                            sx={{
                                p: 2,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                height: 240,
                                borderTop: `solid ${theme.palette.teal[400]} 4px`,
                            }}
                        >
                            <Typography variant="h5" sx={{ mb: 2 }}>
                                จำนวนใบแจ้งซ่อมทั้งหมด
                            </Typography>
                            <Typography variant="h1" sx={{ mb: 2 }}>
                                {countRepair?.count_all}
                            </Typography>
                        </Paper>
                    </Link>
                </Grid>
                {/* <Grid item xs={12} md={6}>
                    <Link href="/repair" underline="none">
                        <Paper
                            elevation={3}
                            sx={{
                                p: 2,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                height: 240,
                                borderTop: `solid ${theme.palette.amber[400]} 4px`,
                            }}
                        >
                            <Typography variant="h5" sx={{ mb: 2 }}>
                                จำนวนใบแจ้งซ่อมวันนี้
                            </Typography>
                            <Typography variant="h1" sx={{ mb: 2 }}>
                            {countRepair?.count_today}
                            </Typography>
                        </Paper>
                    </Link>
                </Grid> */}
            </Grid>
        </React.Fragment>
    );
};

export default Dashboard;
