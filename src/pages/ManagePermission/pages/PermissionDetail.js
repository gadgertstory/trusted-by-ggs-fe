import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { makeStyles } from "@mui/styles";
import { Box, Button, Grid, Stack, Typography, Paper } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import fetchMaster from "../../../middleware/user";
import { history } from "../../../helpers/history";
import { getAllRoles } from "../../../services/actions/role";
import { updateRoleUser, deleteUser } from "../../../services/actions/user";

import RoleDetail from "../components/RoleDetail";
import ConfirmDialog from "../../../components/Dialog/ConfirmDialog";

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    menuPaper: {
        maxHeight: 150,
    },
}));

const ManagePermissionDetail = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { dataAllRoles } = useSelector((state) => state.role);
    const { handleSubmit, control, setValue } = useForm();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState("");
    const [isEdit, setIsEdit] = useState();
    const [openConfirmRemove, setOpenConfirmRemove] = useState(false);

    const defaultValue = useCallback(
        (id) => {
            fetchMaster.getUser(id).then((res) => {
                setValue("role_name", res.data.role?.role_name || "");
                setData(res.data);
            });
        },
        [setValue]
    );

    useEffect(() => {
        dispatch(getAllRoles());
        defaultValue(id);
    }, [dispatch, id, defaultValue]);

    const onSubmit = (data) => {
        setLoading(true);
        dispatch(updateRoleUser(id, data));
    };

    const handleRemove = () => {
        dispatch(deleteUser(id));
    };

    return (
        <>
            <Box
                component="form"
                noValidate
                sx={{ mt: 1 }}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Grid container justifyContent="center" alignItems="center">
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
                                จัดการสิทธิ์
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <Paper
                            sx={{
                                p: 2,
                                display: "flex",
                                flexDirection: "column",
                                lineHeight: "3rem",
                            }}
                        >
                            <RoleDetail
                                id={id}
                                control={control}
                                error={error}
                                setError={setError}
                                classes={classes}
                                roles={dataAllRoles}
                                dataUser={data}
                                isEdit={isEdit}
                                setIsEdit={setIsEdit}
                                setOpenConfirmRemove={setOpenConfirmRemove}
                                openConfirmRemove={openConfirmRemove}
                            />
                        </Paper>
                        {isEdit ? (
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
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
                                    onClick={() => {
                                        history.push("/manage-permission");
                                        window.location.reload();
                                    }}
                                >
                                    Cancel
                                </Button>
                                <LoadingButton
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    loading={loading}
                                >
                                    Update Permission
                                </LoadingButton>
                            </Stack>
                        ) : (
                            ""
                        )}
                        <ConfirmDialog
                            open={openConfirmRemove}
                            onClose={() => setOpenConfirmRemove(false)}
                            title={`ยืนยันการลบข้อมูล!`}
                            description={`ลบผู้ใช้งานออกจากระบบ`}
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
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default ManagePermissionDetail;
