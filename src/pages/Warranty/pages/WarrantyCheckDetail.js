import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../../assets/theme";
import {
    CssBaseline,
    Container,
    Grid,
    Typography,
    Paper,
    Box,
} from "@mui/material";

import Repair from "../../../middleware/repair";
import Logo from "../../../assets/Logo/Trusted-by-GGS.png";
import CustomizedTimeline from "../../../components/Timeline";
import { formatPhoneNumber } from "../../../utils/FormatPhoneNumber";

const WarrantyCheckDetail = () => {
    const id = useParams();
    const [dataRepair, setDataRepair] = useState({});

    useEffect(() => {
        Repair.fetchRepairPDFForCustomer(id.id)
            .then((response) => response.data)
            .then((data) => {
                setDataRepair(data);
            });
    }, [id]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    backgroundColor: theme.palette.grey[200],
                    height: "100vh",
                    overflow: "auto",
                }}
            >
                <Container maxWidth={"sm"} sx={{ mt: 4, mb: 4 }}>
                    <Paper
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            mb: 3,
                            borderLeft: `solid .25rem ${theme.palette.lightBlue[800]}`,
                        }}
                    >
                        <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item>
                                <Box
                                    component="img"
                                    sx={{ width: 100, mb: 2 }}
                                    src={Logo}
                                    alt={Logo}
                                ></Box>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600 }}
                                >
                                 Serial Number
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {dataRepair?.repair_no}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600 }}
                                >
                                    ชื่อ-นามสกุล
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {`${dataRepair?.customer_firstname} XXXXXXX`}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600 }}
                                >
                                    โทรศัพท์
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {formatPhoneNumber(
                                    dataRepair.customer_tel
                                )?.slice(0, 8) + "XXXX"}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600 }}
                                >
                                    ระยะเวลาประกัน
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {dataRepair?.warranty_status}
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default WarrantyCheckDetail;
