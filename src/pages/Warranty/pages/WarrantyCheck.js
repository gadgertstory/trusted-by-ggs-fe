import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { history } from "../../../helpers/history";
import Logo from "../../../assets/Logo/Trusted-by-GGS.png";

import { warrantyRequestSearchByUser } from "../../../services/actions/warranties";
import { formatPhoneNumber } from "../../../utils/FormatPhoneNumber";

const WarrantyCheck = () => {
    const schema = Yup.object().shape({
        serial_number: Yup.string().required(
            "กรุณากรอก หมายเลขเครื่อง/Serial Number"
        ),
    });

    const formOptions = { resolver: yupResolver(schema) };
    const dispatch = useDispatch();
    const { handleSubmit, register, formState } = useForm(formOptions);
    const { errors } = formState;
    const { dataAllWarrantyByUser = [] } = useSelector(
        (state) => state.warranties
    );

    const [onSearch, setOnSearch] = useState(false);
    const [loading] = useState(false);

    const onSubmit = (serialNumber) => {
        const queryParams = `?sn=${serialNumber.serial_number}`;
        history.push(queryParams);
        dispatch(warrantyRequestSearchByUser(queryParams));
        setOnSearch(true);
    };

    const checkExpireDate = () => {
        const endDate = dataAllWarrantyByUser?.[0]?.end_warranty_date;
        const currentDate = new Date().toISOString();
        if (endDate > currentDate) {
            return (
                <>
                    <Typography variant="p">อยู่ในประกัน</Typography>
                    <Typography component={"p"} variant="caption">
                        (ประกันสิ้นสุด{" "}
                        {dataAllWarrantyByUser?.[0]?.end_warranty_date
                            ?.split("T")[0]
                            .split("-")
                            .reverse()
                            .join("/")}
                        )
                    </Typography>
                </>
            );
        } else {
            return (
                <>
                    <Typography variant="p">หมดประกัน</Typography>
                    <Typography component={"p"} variant="caption">
                        (ประกันสิ้นสุด{" "}
                        {dataAllWarrantyByUser?.[0]?.end_warranty_date
                            ?.split("T")[0]
                            .split("-")
                            .reverse()
                            .join("/")}
                        )
                    </Typography>
                </>
            )
            
        }
    };

    const purchaseMethodCheck = () => {
        const purchase_method = dataAllWarrantyByUser?.[0]?.purchase_method
        if (!purchase_method) {
            return "none"
        }
    }

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
                                label="หมายเลขเครื่อง/Serial Number"
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
                            <p>
                                <p style={{color: "red"}}>*ตัวอย่างการระบุข้อมูล: X-XXXXXXXXXXXX</p>
                                <p style={{color: "red"}}>**ไม่ต้องระบุ SN นำหน้า</p>
                            </p>
                            <></>
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
                    {onSearch === true ? (
                        <>
                            {dataAllWarrantyByUser.length > 0 ? (
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        mb: 3,
                                        borderLeft: `solid .25rem ${theme.palette.lightBlue[800]}`,
                                    }}
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <Typography
                                                variant="p"
                                                sx={{ fontWeight: 600 }}
                                            >
                                                ชื่อสินค้า
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            {dataAllWarrantyByUser?.[0]?.product_name}
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography
                                                variant="p"
                                                sx={{ fontWeight: 600 }}
                                            >
                                                หมายเลขเครื่อง/Serial Number
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            {
                                                dataAllWarrantyByUser?.[0]
                                                    ?.product_serial_no
                                            }
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography
                                                variant="p"
                                                sx={{ fontWeight: 600 }}
                                            >
                                                วันที่เริ่มต้นการรับประกันสินค้า
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            {dataAllWarrantyByUser?.[0]?.start_warranty_date
                                                .split("T")[0]
                                                .split("-")
                                                .reverse()
                                                .join("/")}
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography
                                                variant="p"
                                                sx={{ fontWeight: 600 }}
                                            >
                                                การรับประกันสินค้า
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            {checkExpireDate()}
                                        </Grid>
                                        <Grid item xs={12} md={6} display={purchaseMethodCheck()}>
                                            <Typography
                                                variant="p"
                                                sx={{ fontWeight: 600 }}
                                            >
                                                ช่องทางการสั่งซื้อ
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6} display={purchaseMethodCheck()}>
                                            {
                                                dataAllWarrantyByUser?.[0]?.purchase_method                                             
                                            }
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography
                                                variant="p"
                                                sx={{ fontWeight: 600 }}
                                            >
                                                ชื่อ-นามสกุล
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            {
                                                dataAllWarrantyByUser?.[0]
                                                    ?.customer_firstname
                                            }{" "}
                                            {
                                                dataAllWarrantyByUser?.[0]
                                                    ?.customer_lastname
                                            }
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography
                                                variant="p"
                                                sx={{ fontWeight: 600 }}
                                            >
                                                โทรศัพท์
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            {formatPhoneNumber(
                                                dataAllWarrantyByUser?.[0]
                                                    ?.customer_tel
                                            )}
                                        </Grid>
                                    </Grid>
                                </Paper>
                            ) : (
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        mb: 3,
                                        borderLeft: `solid .25rem ${theme.palette.red[800]}`,
                                    }}
                                >
                                    ไม่พบข้อมูลหมายเลขเครื่อง/Serial Number
                                </Paper>
                            )}
                        </>
                    ) : (
                        ""
                    )}
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default WarrantyCheck;
