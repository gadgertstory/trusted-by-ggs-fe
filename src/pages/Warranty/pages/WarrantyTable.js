import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import MaterialTable from "material-table";
import { history } from "../../../helpers/history";
import { Button, Stack, Typography, Box, Link } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

import { warrantyRequestSearch } from "../../../services/actions/warranties";
import HeaderTable from "../components/HeaderTable";

// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import LoadingButton from "@mui/lab/LoadingButton";

// import ExportExcel from "../../../utils/ExportExcel";

const WarrantyTable = (roleUser) => {
    const dispatch = useDispatch();
    const { control } = useForm();
    const { dataAllWarranty = [] } = useSelector((state) => state.warranties);

    const [status, setStatus] = useState(0);
    const [keyword, setKeyword] = useState("");

    // const [openDialog, setOpenDialog] = useState(false);
    // const [value, setValue] = useState([null, null]);
    // const [newValue, setNewValue] = useState([null, null]);

    useEffect(() => {
        handleSearch();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const selectRow = (selectRow) => {
        const id = selectRow.warranty_id;

        history.push(`/warranty/${id}`);
        window.location.reload();
    };

    const selectNewtab = (rowData) => {
        const id = rowData.warranty_id;
        window.open(`/warranty/${id}`, "_blank");
    };

    const handleCreateWarranty = () => {
        history.push("/warranty/new");
        window.location.reload();
    };

    const handleChangeStatus = (e) => {
        setStatus(e.target.value);
    };

    const handleChangeKeyword = (e) => {
        setKeyword(e.target.value);
    };

    const handleSearch = useCallback(
        (isClear) => {
            const _keyword = isClear ? "" : keyword;
            const queryParams = `?sn=${_keyword}`;
            history.push(queryParams);
            dispatch(warrantyRequestSearch(queryParams));
        },
        [keyword, dispatch]
    );

    const Logo = (brandName) => {
        let src = "";

        if (brandName === "Sillicons") {
            src =
                "https://gadgetstory-logo.s3.ap-southeast-1.amazonaws.com/Sillicons.png";
        } else if (brandName === "Keychron") {
            src =
                "https://gadgetstory-logo.s3.ap-southeast-1.amazonaws.com/Keychron.png";
        } else if (brandName === "RSQ") {
            src =
                "https://gadgetstory-logo.s3.ap-southeast-1.amazonaws.com/Rolling-Square.png";
        } else if (brandName === "XDDesign") {
            src =
                "https://gadgetstory-logo.s3.ap-southeast-1.amazonaws.com/XD-Design.png";
        } else if (brandName === "Deltahub") {
            src =
                "https://gadgetstory-logo.s3.ap-southeast-1.amazonaws.com/DeltaHub.png";
        } else if (brandName === "INVZI") {
            src =
                "https://gadgetstory-logo.s3.ap-southeast-1.amazonaws.com/Invzi.png";
        } else {
            src =
                "https://gadgetstory-logo.s3.ap-southeast-1.amazonaws.com/NuPhy.png";
        }

        return (
            <Stack
                direction="row"
                justifyItems={"center"}
                alignItems={"center"}
            >
                <img height="20" width="20" src={src} alt={brandName}></img>
                <Box> &nbsp; {brandName}</Box>
            </Stack>
        );
    };

    // const handleOpenDialog = () => {
    //     setOpenDialog(true);
    // };

    // const handleCloseDialog = () => {
    //     setValue([null, null]);
    //     setNewValue([null, null]);
    //     setOpenDialog(false);
    // };

    // const handleExport = (val) => {
    //     ExportExcel(val);
    //     handleSearch();
    //     handleCloseDialog();
    //     setNewValue([null, null]);
    //     setValue([null, null]);
    // };

    // const handleDateChange = (e) => {
    //     if (e) {
    //         e.preventDefault();
    //     }
    // };

    return (
        <>
            <Stack
                sx={{ my: 2 }}
                direction="row"
                justifyContent={"space-between"}
            >
                <Typography variant="h4" component="h1">
                    <VerifiedUserIcon /> การรับประกัน
                </Typography>
                {roleUser.roleUser.role !== "user" ? (
                    <Button
                        sx={{
                            bgcolor: "secondary.light",
                            color: "background.default",
                            ":hover": {
                                bgcolor: "secondary.main",
                            },
                        }}
                        variant="contained"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={handleCreateWarranty}
                    >
                        เพิ่มข้อมูลการรับประกัน
                    </Button>
                ) : (
                    ""
                )}
            </Stack>
            <HeaderTable
                status={status}
                onChangeStatus={handleChangeStatus}
                control={control}
                onSearch={handleSearch}
                keyword={keyword}
                onChangeKeyword={handleChangeKeyword}
                roleUser={roleUser}
                // handleOpenDialog={handleOpenDialog}
            />

            <MaterialTable
                options={{
                    search: false,
                    actionsColumnIndex: -1,
                    pageSize: 20,
                    pageSizeOptions: [20, 40, 60, 80, 100],
                    toolbar: false,
                    sorting: false,
                }}
                title=""
                columns={[
                    {
                        title: "ลำดับ",
                        textAlign: "center",
                        render: (rowData) => (
                            <Typography component="p" variant="p">
                                {rowData.tableData.id + 1}
                            </Typography>
                        ),
                    },
                    {
                        title: "ชื่อ - นามสกุล",
                        render: (rowData) => (
                            <Link
                                href="#"
                                onClick={() => selectNewtab(rowData)}
                            >
                                <Box
                                    sx={{
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        maxWidth: 150,
                                    }}
                                >
                                    {rowData.customer_firstname}{" "}
                                    {rowData.customer_lastname}
                                </Box>
                            </Link>
                        ),
                    },
                    {
                        title: "เบอร์โทรศัพท์",
                        field: "customer_tel",
                        render: (rowData) => <>{rowData.customer_tel}</>,
                    },
                    {
                        title: "อีเมล",
                        field: "customer_email",
                        render: (rowData) => <>{rowData.customer_email}</>,
                    },
                    {
                        title: "Brand",
                        render: (rowData) => (
                            <Box
                                sx={{
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    maxWidth: 150,
                                }}
                            >
                                {Logo(rowData.brand.brand_name)}
                            </Box>
                        ),
                    },
                    {
                        title: "ชื่ออุปกรณ์",
                        align: "center",
                        cellStyle: {
                            textAlign: "center",
                        },
                        render: (rowData) => <>{rowData.product_name}</>,
                    },
                    {
                        title: "Serial Number",
                        align: "center",
                        cellStyle: {
                            textAlign: "center",
                        },
                        render: (rowData) => <>{rowData.product_serial_no}</>,
                    },
                ]}
                data={dataAllWarranty}
                actions={[
                    {
                        title: " ",
                        icon: "visibility",
                        tooltip: "View Detail",
                        onClick: (e, rowData) => {
                            selectRow(rowData);
                        },
                    },
                ]}
                localization={{
                    header: {
                        actions: " ",
                    },
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

            {/* <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogContent>
                    <Typography
                        component={"h5"}
                        variant={"h5"}
                        fontWeight={"bold"}
                        sx={{ mb: 2 }}
                    >
                        Export Excel
                    </Typography>
                    <DialogContentText id="alert-dialog-description">
                        <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            localeText={{ start: "Check-in", end: "Check-out" }}
                        >
                            <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                                localeText={{
                                    start: "วันที่เริ่มต้น",
                                    end: "วันที่สิ้นสุด",
                                }}
                            >
                                <DateRangePicker
                                    value={value}
                                    onChange={(value) => {
                                        setValue(value);
                                        var tzoffset =
                                            new Date().getTimezoneOffset() *
                                            60000; //offset in milliseconds
                                        setNewValue([
                                            new Date(value[0] - tzoffset)
                                                .toISOString()
                                                .slice(0, -1)
                                                .split("T")[0],
                                            new Date(value[1] - tzoffset)
                                                .toISOString()
                                                .slice(0, -1)
                                                .split("T")[0],
                                        ]);
                                    }}
                                    renderInput={(startProps, endProps) => (
                                        <React.Fragment>
                                            <TextField
                                                {...startProps}
                                                onKeyDown={handleDateChange}
                                            />
                                            <Box sx={{ mx: 2 }}> to </Box>
                                            <TextField
                                                {...endProps}
                                                onKeyDown={handleDateChange}
                                            />
                                        </React.Fragment>
                                    )}
                                />
                            </LocalizationProvider>
                        </LocalizationProvider>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{
                            my: 2,
                            bgcolor: "background.default",
                            color: "text.primary",
                            ":hover": {
                                bgcolor: "background.default",
                            },
                        }}
                        variant="contained"
                        onClick={handleCloseDialog}
                    >
                        Cancel
                    </Button>
                    <LoadingButton
                        variant="contained"
                        color="primary"
                        onClick={() => handleExport(newValue)}
                        autoFocus
                    >
                        Submit
                    </LoadingButton>
                </DialogActions>
            </Dialog> */}
        </>
    );
};

export default WarrantyTable;
