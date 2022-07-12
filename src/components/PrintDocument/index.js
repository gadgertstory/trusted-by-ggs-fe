import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../assets/theme";
import BadgeStatus from "../../components/Badge";
import {
    CssBaseline,
    Container,
    Grid,
    Typography,
    Paper,
    Box,
} from "@mui/material";
import MaterialTable from "material-table";

import Repair from "../../middleware/repair";

const PrintDocument = () => {
    const id = useParams();
    const [dataRepair, setDataRepair] = useState({});
    const [dataHistory, setDataHistory] = useState([]);

    useEffect(() => {
        Repair.fetchRepairPDFForCustomer(id.id)
            .then((response) => response.data)
            .then((data) => {
                setDataRepair(data);
            });
    }, [id]);

    useEffect(() => {
        const _newData = dataRepair.histories;
        const _newDataDate = _newData?.map((index) => ({
            ...index,
            process_date: new Date(index.process_date).toLocaleString("th-TH",{ timeZone: "UTC" }), // just for example
        }));
        setDataHistory(_newDataDate)
    }, [dataRepair]);

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
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{ mb: 2, fontWeight: 600 }}
                        >
                            รายละเอียดลูกค้า
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600 }}
                                >
                                    ชื่อ-นามสกุล
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {dataRepair.customer_firstname}{" "}
                                {dataRepair.customer_lastname}
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
                                {dataRepair.customer_tel}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600 }}
                                >
                                    ที่อยู่
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {dataRepair.customer_house_no} ,
                                {dataRepair.customer_subdistrict} ,
                                {dataRepair.customer_district} ,
                                {dataRepair.customer_province} ,
                                {dataRepair.customer_zipcode}
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            mb: 3,
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{ mb: 2, fontWeight: 600 }}
                        >
                            รายละเอียดการซ่อม
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600 }}
                                >
                                    ชื่ออุปกรณ์
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {dataRepair.product_name}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600 }}
                                >
                                    หมายเลขเครื่อง/Serial Number
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {dataRepair.product_serial_no}
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
                                {dataRepair.brand?.brand_name}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600 }}
                                >
                                    description
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {dataRepair.description}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600 }}
                                >
                                    หมายเหตุ
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {dataRepair.remark}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600 }}
                                >
                                    วันที่รับซ่อม
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {dataRepair.received_date}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600 }}
                                >
                                    วันที่นัดรับ
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {dataRepair.return_date}
                            </Grid>
                        </Grid>
                    </Paper>
                    <MaterialTable
                        options={{
                            search: false,
                            actionsColumnIndex: -1,
                            pageSize: 5,
                            toolbar: false,
                        }}
                        title=""
                        columns={[
                            { title: "ผู้ปฏิบัติงาน", field: "user.user_name" },
                            {
                                title: "สถานะการซ่อม",
                                align: "center",
                                cellStyle: {
                                    textAlign: "center",
                                },
                                render: (rowData) => (
                                    <BadgeStatus
                                        badgeContent={
                                            rowData.status.status_name
                                        }
                                    ></BadgeStatus>
                                ),
                                textOverflow: "ellipsis",
                            },
                            {
                                title: "วันที่ทำรายการ",
                                field: "process_date",
                                textOverflow: "ellipsis",
                            },
                            {
                                title: "รายละเอียดการซ่อม",
                                field: "description",
                                textOverflow: "ellipsis",
                            },
                        ]}
                        data={dataHistory}
                        localization={{
                            body: {
                                emptyDataSourceMessage: (
                                    <h1
                                        style={{
                                            top: "50%",
                                            textAlign: "center",
                                        }}
                                    >
                                        ไม่พบข้อมูล
                                    </h1>
                                ),
                            },
                        }}
                    />
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default PrintDocument;
