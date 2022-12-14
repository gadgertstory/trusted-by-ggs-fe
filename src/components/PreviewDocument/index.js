import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../assets/theme";
import {
    CssBaseline,
    Container,
    Grid,
    Typography,
    Paper,
    Box,
} from "@mui/material";

import Repair from "../../middleware/repair";
import Logo from "../../assets/Logo/Trusted-by-GGS.png";
import CustomizedTimeline from '../Timeline'
import { formatPhoneNumber } from "../../utils/FormatPhoneNumber";

const PreviewDocument = () => {
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
                <Container maxWidth={"lg"} sx={{ mt: 4, mb: 4 }}>
                    <Paper
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            mb: 3,
                            borderLeft: `solid .25rem ${theme.palette.lightBlue[800]}`,
                        }}
                    >
                        <Box
                            component="img"
                            sx={{ width: 100, mb: 2 }}
                            src={Logo}
                            alt={Logo}
                        ></Box>
                        <Typography
                            variant="h5"
                            sx={{
                                mb: 2,
                                fontWeight: 600,
                                color: theme.palette.lightBlue[800],
                            }}
                        >
                            ????????????????????????????????????????????????
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600 }}
                                >
                                    ????????????????????????????????????????????????
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
                                    ????????????-?????????????????????
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
                                    ????????????????????????
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
                                    ?????????????????????
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                XXXXX ,
                                {dataRepair?.customer_subdistrict} ,
                                {dataRepair?.customer_district} ,
                                {dataRepair?.customer_province} ,
                                XXXXX
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600 }}
                                >
                                    ??????????????????????????????????????????????????????
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {dataRepair?.purchase_method}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600 }}
                                >
                                    ??????????????????????????????????????????
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {dataRepair?.receive_method}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600 }}
                                >
                                    ??????????????????????????????????????? / ??????????????????????????????????????????
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {dataRepair?.order_no}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600 }}
                                >
                                    ??????????????????????????????????????????
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {dataRepair?.warranty_status}
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            mb: 3,
                            borderLeft: `solid .25rem ${theme.palette.lightBlue[800]}`,
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                mb: 2,
                                fontWeight: 600,
                                color: theme.palette.lightBlue[800],
                            }}
                        >
                            ???????????????????????????????????????????????????
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600 }}
                                >
                                    ?????????????????????????????????
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {dataRepair?.product_name}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600 }}
                                >
                                    ??????????????????????????????????????????/Serial Number
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {dataRepair?.product_serial_no}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600 }}
                                >
                                    Brand
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {dataRepair?.brand?.brand_name}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600 }}
                                >
                                    ???????????????????????????????????????????????????
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {dataRepair?.description}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600 }}
                                >
                                    ????????????????????????
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {dataRepair?.remark}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600 }}
                                >
                                    ????????????????????????????????????????????????
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {dataRepair?.notified_date
                                    ?.split("-")
                                    .reverse()
                                    .join("/")}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600 }}
                                >
                                    ???????????????????????????????????????
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {dataRepair?.received_date
                                    ?.split("-")
                                    .reverse()
                                    .join("/")}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600 }}
                                >
                                    ????????????????????????????????????
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {dataRepair?.return_date
                                    ?.split("-")
                                    .reverse()
                                    .join("/")}
                            </Grid>
                        </Grid>
                    </Paper>
                    <CustomizedTimeline dataRepair={dataRepair}/>
                    {/* <HistoryTableDetail dataRepair={dataRepair} /> */}
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default PreviewDocument;
