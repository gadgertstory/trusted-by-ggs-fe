import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../../assets/theme";

import SearchIcon from "@mui/icons-material/Search";

import {
    CssBaseline,
    Container,
    Grid,
    Typography,
    Paper,
    Box,
    TextField,
    Link,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { history } from "../../../helpers/history";
import { forgotPassword } from "../../../services/actions/auth";
import Logo from "../../../assets/Logo/Trusted-by-GGS.png";

import Repair from "../../../middleware/repair";
import { formatPhoneNumber } from "../../../utils/FormatPhoneNumber";

const WarrantyCheck = () => {
    const id = useParams();
    const schema = Yup.object().shape({
        serial_number: Yup.string(),
    });

    const formOptions = { resolver: yupResolver(schema) };
    const dispatch = useDispatch();
    const { handleSubmit, register, formState } = useForm(formOptions);
    const { errors } = formState;
    const [dataRepair, setDataRepair] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        Repair.fetchRepairPDFForCustomer(id.id)
            .then((response) => response.data)
            .then((data) => {
                setDataRepair(data);
            });
    }, [id]);

    const onSubmit = (email) => {
        setLoading(true);
        // history.push("warranty-details");
        // setTimeout(function () {
        //     window.location.reload();
        // }, 1000 * 1.5);
        // setTimeout(() => {
        //     dispatch(forgotPassword(email));
        //     clearTimeout(setLoading(false));
        // }, 1000 * 5);
    };

    console.log(typeof dataRepair);

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
                        <Typography
                            variant="h5"
                            textAlign={"center"}
                            sx={{
                                fontWeight: 600,
                                color: theme.palette.lightBlue[800],
                            }}
                        >
                            ค้นหาข้อมูลการรับประกัน
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Serial number"
                                autoFocus
                                type="text"
                                error={!!errors["serial_number"]}
                                helperText={
                                    errors["serial_number"]
                                        ? errors["serial_number"].message
                                        : ""
                                }
                                {...register("serial_number")}
                            />

                            <Grid
                                container
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item>
                                    <LoadingButton
                                        type="submit"
                                        variant="contained"
                                        sx={{ my: 2 }}
                                        loading={loading}
                                    >
                                        <SearchIcon />
                                        ค้นหา
                                    </LoadingButton>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                    {typeof dataRepair !== "object" ? (
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
                    ) : (
                        ""
                    )}
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default WarrantyCheck;
