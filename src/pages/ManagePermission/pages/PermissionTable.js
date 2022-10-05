import React, { useEffect, useState } from "react";
import {
    Box,
    Grid,
    Typography
} from "@mui/material";
import MaterialTable from "material-table";
import { useDispatch } from "react-redux";
import { deleteUser, getAllUsers } from "../../../services/actions/user";
import { getAllRoles } from "../../../services/actions/role";
import { useSelector } from "react-redux";
import { history } from "../../../helpers/history";
import { Feed } from "@mui/icons-material";
import ConfirmDialog from "../../../components/Dialog/ConfirmDialog";

const Table = (props) => {
    const dispatch = useDispatch();
    const { dataAllUsers = [] } = useSelector((state) => state.user);
    const[openConfirmRemove, setOpenConfirmRemove] = useState(false);
    const [deleteId, setDeleteId] = useState();

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch]);

    const selectRow = (selectRow) => {
        const id = selectRow.user_id;

        history.push(`/manage-permission/${id}`);
        window.location.reload();
    };

    const deleteRow = (selectRow) => {
        setDeleteId(selectRow.user_id)
        setOpenConfirmRemove(true);
    }

    const handleRemove = () => {
        dispatch(deleteUser(deleteId));
        setDeleteId(null)
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
                        field: 'role.role_name',
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
                        return rowData.role?.role_name !== 'superAdmin' ? {
                            title: " ",
                            icon: "edit",
                            tooltip: "Edit",
                            onClick: () => {
                                selectRow(rowData);
                            },
                        } : ''
                    },
                    (rowData) => {
                        return rowData.role?.role_name !== 'superAdmin' ? {
                            title: " ",
                            icon: "delete",
                            tooltip: "Delete",
                            onClick: () => {
                                deleteRow(rowData);
                            },
                        } : ''
                    }

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


            <ConfirmDialog
                open={openConfirmRemove}
                onClose={() => setOpenConfirmRemove(false)}
                title={`ยืนยันการลบข้อมูล!`}
                description={`ลบข้อมูลผู้ใช้งานระบบ`}
                buttonConfirmText={"ยืนยันการลบ"}
                buttonConfirmStyle={{
                    backgroundColor: "error.main",
                    "&:hover": { backgroundColor: "error.main" },
                }}
                onConfirmed={() => {
                    handleRemove();
                    setOpenConfirmRemove(false);
                }}
            />
        </>
    );
};

const ManagePermissionTable = (roleUser) => {

    return (
        <>
            <Box
                component="form"
                noValidate
                sx={{ mt: 1 }}
            >
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
                            <Feed fontSize="large" />
                            <Typography variant="h4" component="h2">
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
