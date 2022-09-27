import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

import MaterialTable from "material-table";
import { history } from "../../../helpers/history";
import { Button, Stack, Typography, Box, Link } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { RepairRequestSearch } from "../../../services/actions/repairs";
import { getAllStatus } from "../../../services/actions/status";
import HeaderTable from "../components/HeaderTable";
import BadgeStatus from "../../../components/Badge";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from "@mui/lab/LoadingButton";

import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import ExportExcel from "../../../utils/ExportExcel";

const RepairTable = (roleUser) => {
    const dispatch = useDispatch();
    const { control } = useForm();
    const { dataAllRepair = [] } = useSelector((state) => state.repairs);

    const { search } = useLocation();
    const [status, setStatus] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [openDialog, setOpenDialog] = useState(false)

    const [value, setValue] = useState([null, null]);
    const [newValue, setNewValue] = useState([null, null])

    useEffect(() => {
        dispatch(getAllStatus());
    }, [dispatch]);

    const useQuery = () => {
        return React.useMemo(() => new URLSearchParams(search), []);
    };

    const query = useQuery();

    useEffect(() => {
        handleSearchByDashboard();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const selectRow = (selectRow) => {
        const id = selectRow.repair_id;

        history.push(`/repair/${id}`);
        window.location.reload();
    };

    const selectNewtab = (rowData) => {
        const id = rowData.repair_id;
        window.open(`/repair/${id}`, "_blank");
    };

    const handleCreateRepair = () => {
        history.push("/repair/new");
        window.location.reload();
    };

    const handleChangeStatus = (e) => {
        setStatus(e.target.value);
    };

    const handleChangeKeyword = (e) => {
        setKeyword(e.target.value);
    };

    const handleSearchByDashboard = useCallback(
        (isClear) => {
            const _keyword = isClear ? "" : keyword;
            setStatus(query.get("status_no"));
            const queryParams = `?status_no=${query.get(
                "status_no"
            )}&customer_name=${_keyword}`;
            history.push(queryParams);
            dispatch(RepairRequestSearch(queryParams));
        },
        [keyword, dispatch, query]
    );

    const handleSearch = useCallback(
        (isClear) => {
            const _keyword = isClear ? "" : keyword;

            const queryParams = `?status_no=${status}&customer_name=${_keyword}`;
            history.push(queryParams);
            dispatch(RepairRequestSearch(queryParams));
        },
        [keyword, status, dispatch]
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

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setValue([null, null])
        setNewValue([null, null])
        setOpenDialog(false);
    };

    const handleExport = (val) => {
        ExportExcel(val)
        handleSearch()
        handleCloseDialog()
        setNewValue([null, null])
        setValue([null, null])
    }

    return (
        <>
            <Stack
                sx={{ my: 2 }}
                direction="row"
                justifyContent={"space-between"}
            >
                <Typography variant="h5" component="h1">
                    RepairTable
                </Typography>
                {roleUser.roleUser.role === "admin" ? (
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
                        onClick={handleCreateRepair}
                    >
                        เพิ่มใบแจ้งซ่อม
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
                handleOpenDialog={handleOpenDialog}
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
                        title: "เลขที่ใบแจ้งซ่อม",
                        field: "repair_no",
                        render: (rowData) => (
                            <Link href="#" onClick={() => selectNewtab(rowData)}>
                                {rowData.repair_no}
                            </Link>
                        ),
                    },
                    {
                        title: "ชื่อ - นามสกุล",
                        render: (rowData) => (
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
                        ),
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
                                {Logo(rowData.brand_name)}
                            </Box>
                        ),
                    },
                    {
                        title: "วันที่แจ้งเรื่อง",
                        render: (rowData) => (
                            <Box
                                sx={{
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    maxWidth: 100,
                                }}
                            >
                                {rowData.notified_date
                                    ?.split("-")
                                    .reverse()
                                    .join("/")}
                            </Box>
                        ),
                    },
                    {
                        title: "วันที่รับซ่อม",
                        render: (rowData) => (
                            <Box
                                sx={{
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    maxWidth: 100,
                                }}
                            >
                                {rowData.received_date
                                    ?.split("-")
                                    .reverse()
                                    .join("/")}
                            </Box>
                        ),
                    },
                    {
                        title: "วันที่นัดรับ",
                        render: (rowData) => (
                            <Box
                                sx={{
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    maxWidth: 100,
                                }}
                            >
                                {rowData.return_date
                                    ?.split("-")
                                    .reverse()
                                    .join("/")}
                            </Box>
                        ),
                    },
                    {
                        title: "สถานะการซ่อม",
                        align: "center",
                        cellStyle: {
                            textAlign: "center",
                        },
                        render: (rowData) => (
                            <BadgeStatus
                                badgeContent={rowData.status_name}
                            ></BadgeStatus>
                        ),
                    },
                ]}
                data={dataAllRepair}
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

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle id="alert-dialog-title">
                    {"EXPORT PDF"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            localeText={{ start: 'Check-in', end: 'Check-out' }}
                        >
                            <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                                localeText={{ start: 'วันที่เริ่มต้น', end: 'วันที่สิ้นสุด' }}
                            >
                                <DateRangePicker
                                    value={value}
                                    onChange={(value) => {
                                        setValue(value);
                                        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
                                        setNewValue([(new Date(value[0] - tzoffset)).toISOString().slice(0, -1).split("T")[0], (new Date(value[1] - tzoffset)).toISOString().slice(0, -1).split("T")[0]])
                                    }}
                                    renderInput={(startProps, endProps) => (
                                        <React.Fragment>
                                            <TextField {...startProps} />
                                            <Box sx={{ mx: 2 }}> to </Box>
                                            <TextField {...endProps} />
                                        </React.Fragment>
                                    )}
                                />
                            </LocalizationProvider>
                        </LocalizationProvider>
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <LoadingButton
                        onClick={() => handleExport(newValue)}
                        autoFocus
                    >
                        Submit
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default RepairTable;
