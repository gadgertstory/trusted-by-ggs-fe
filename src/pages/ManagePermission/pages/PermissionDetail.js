import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import RoleDetail from "../components/RoleDetail";

import fetchMaster from "../../../middleware/user";
import { history } from "../../../helpers/history";
import { updateRoleUser } from "../../../services/actions/user";
import { getAllRoles } from "../../../services/actions/roles";

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    menuPaper: {
        maxHeight: 150,
    },
}));

const ManagePermissionDetail = (roleUser) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { dataAllRoles } = useSelector((state) => state.roles);
    const { handleSubmit, control, setValue } = useForm();

    const [error, setError] = useState("");
    const [name, setName] = useState();
    const [loading, setLoading] = useState(false);
    
    const defaultValue = useCallback(
        (id) => {
            fetchMaster.getUser(id).then((result) => {
                setValue("role_name", result.data.role?.role_name || "");
                setName(result.data.user_name);
            });
        },
        [setValue]
    );
    
    useEffect(() => {
        dispatch(getAllRoles());
        defaultValue(id);
    }, [dispatch, id,defaultValue]);


    const onSubmit = (data) => {
        setLoading(true);
        dispatch(updateRoleUser(id, data));
    };

    return (
        <>
            <Box
                component="form"
                noValidate
                sx={{ mt: 1 }}
                onSubmit={handleSubmit(onSubmit)}
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
                            <ManageAccountsIcon fontSize="large" />
                            <Typography variant="h4" component="h1">
                                จัดการสิทธิ์ {name}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <RoleDetail
                    control={control}
                    error={error}
                    setError={setError}
                    classes={classes}
                    roles={dataAllRoles}
                />
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
                        sx={{ my: 2 }}
                        variant="contained"
                        color="primary"
                        type="submit"
                        loading={loading}
                    >
                        Submit
                    </LoadingButton>
                </Stack>
            </Box>
        </>
    );
};

export default ManagePermissionDetail;
