import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import MaterialTable from "material-table";
import { history } from "../../../helpers/history";
import { Button, Stack, Typography, Box } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import {
    getAllRepair,
    requestRepairSearch,
} from "../../../services/actions/repairs";
import { getAllStatus } from "../../../services/actions/status";
import HeaderTable from "../components/HeaderTable";
import BadgeStatus from "../../../components/Badge";

const RepairTable = (roleUser) => {
    const dispatch = useDispatch();
    const { control } = useForm();
    const { dataAllRepair = [] } = useSelector((state) => state.repairs);

    const [status, setStatus] = useState(0);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        dispatch(getAllStatus());
    }, [dispatch]);

    useEffect(() => {
        handleSearch();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const selectRow = (selectRow) => {
        const id = selectRow.repair_id;

        history.push(`/repair/${id}`);
        window.location.reload();
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

    const handleSearch = useCallback(
        (isClear) => {
            const _keyword = isClear ? "" : keyword;
            const params = {
                status_no: status,
                customer_name: _keyword,
            };

            if (status === 0 && _keyword === "") {
                dispatch(getAllRepair());
            } else {
                dispatch(requestRepairSearch(params));
            }
        },
        [keyword, status, dispatch]
    );

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
            />
            <MaterialTable
                options={{
                    search: false,
                    actionsColumnIndex: -1,
                    pageSize: 20,
                    pageSizeOptions: [20, 40, 60, 80, 100],
                    toolbar: false,
                    sorting:false
                    // maxBodyHeight: "50vh",
                    // headerStyle: { position: 'sticky', top: 0 }
                }}
                title=""
                columns={[
                    {
                        title: "ลำดับ",
                        textAlign: "center",
                        render: (rowData) => (
                            <Typography component="p" variant="p">{rowData.tableData.id + 1}</Typography>
                        ),
                    },
                    { title: "เลขที่ใบแจ้งซ่อม", field: "repair_no" },
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
                                {rowData.customer_firstname} {rowData.customer_lastname}
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
                                {rowData.brand_name}
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
                                    .split("-")
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
                                    .split("-")
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
        </>
    );
};

export default RepairTable;
