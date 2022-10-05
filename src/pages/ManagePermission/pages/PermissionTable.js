import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Grid, Typography } from "@mui/material";
import MaterialTable from "material-table";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import { history } from "../../../helpers/history";
import { getAllUsers } from "../../../services/actions/users";

const Table = () => {
    const dispatch = useDispatch();
    const { dataAllUsers = [] } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const selectRow = (selectRow) => {
        const id = selectRow.user_id;

        history.push(`/manage-permission/${id}`);
        window.location.reload();
    };

    return (
        <>
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
                        title: "ชื่อ",
                        render: (rowData) => (
                            <Box
                                sx={{
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    maxWidth: 150,
                                }}
                            >
                                {rowData.user_name}
                            </Box>
                        ),
                    },

                    {
                        title: "อีเมล",
                        render: (rowData) => (
                            <Box
                                sx={{
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    maxWidth: 100,
                                }}
                            >
                                {rowData.user_email}
                            </Box>
                        ),
                    },
                    {
                        title: "สิทธิ์ผู้ใช้งาน",
                        field: "role.role_name",
                        render: (rowData) => (
                            <Box
                                sx={{
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    maxWidth: 150,
                                }}
                            >
                                {rowData.role?.role_name.toUpperCase()}
                            </Box>
                        ),
                    },
                ]}
                actions={[
                    (rowData) => {
                        return rowData.role?.role_name !== "superAdmin"
                            ? {
                                  title: " ",
                                  icon: "visibility",
                                  tooltip: "View Detail",
                                  onClick: () => {
                                      selectRow(rowData);
                                  },
                              }
                            : "";
                    },
                ]}
                data={dataAllUsers}
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

const ManagePermissionTable = () => {
    return (
        <>
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <Grid
                    container
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid>
                        <Grid
                            container
                            flexDirection="row"
                            alignItems={"center"}
                            sx={{
                                p: 2,
                            }}
                        >
                            <ManageAccountsIcon fontSize="large" /> &nbsp;
                            <Typography variant="h4" component="h1">
                                จัดการสิทธิ์ผู้ใช้งาน
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Table />
            </Box>
        </>
    );
};

export default ManagePermissionTable;
