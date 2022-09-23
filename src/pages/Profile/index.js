import React, { useEffect, useState, useRef, useCallback } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import {
    Typography,
    Box,
    Paper,
    Grid,
    Avatar,
    IconButton,
    Stack,
    TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Edit } from "@mui/icons-material";

import getProfile from "../../middleware/user";
import { updateProfile } from "../../services/actions/profile";

import Input from "../../components/Input";

const Profile = () => {
    const validationSchema = Yup.object().shape(
        {
            user_name: Yup.string().nullable().notRequired(),
            user_old_password: Yup.string()
                .nullable()
                .notRequired()
                .when("user_password", {
                    is: (value) => value?.length,
                    then: (rule) =>
                        rule.min(8, "Password must be at least 8 characters"),
                }),
            new_password: Yup.string()
                .nullable()
                .notRequired()
                .when("user_old_password", {
                    is: (value) => value?.length,
                    then: (rule) =>
                        rule.min(8, "Password must be at least 8 characters"),
                }),
            user_password: Yup.string().oneOf(
                [Yup.ref("new_password")],
                "Passwords must match"
            ),
        },
        [
            // Add Cyclic deps here because when require itself
            ["new_password"],
            ["user_old_password"],
            ["user_name"],
            ["user_password"],
        ]
    );
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { handleSubmit, control, setValue, register, formState } =
        useForm(formOptions);
    const { errors } = formState;

    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState();
    const [profile, setProfile] = useState({});

    useEffect(() => {
        fetch();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const fetch = useCallback(() => {
        getProfile.getProfile().then((res) => {
            const profile = res.data;
            setProfile(profile);
            setValue("user_name", profile.user_name || "");
        });
    }, []);

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    const onSubmit = (data) => {
        const user_email = profile.user_email;
        const dataProfile = { ...data, user_email };
        // console.log(data);
        dispatch(updateProfile(dataProfile));
    };

    const handleUpdateProfile = () => {
        setIsEdit(!isEdit);
    };

    return (
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
                    <Stack direction="row" justifyContent={"flex-end"}>
                        <IconButton onClick={handleUpdateProfile}>
                            <Edit />
                        </IconButton>
                    </Stack>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Avatar
                            src="/static/images/avatar/2.jpg"
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.secondary.light,
                                width: 100,
                                height: 100,
                            }}
                        />

                        <Typography variant="h4" component="h4" sx={{ mt: 2 }}>
                            Profile
                        </Typography>
                    </Grid>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <Grid container direction="column">
                            <Typography variant="p">
                                {isEdit ? (
                                    <TextField
                                        size="small"
                                        sx={{ mb: 2 }}
                                        label="Name"
                                        fullWidth
                                        type="text"
                                        error={!!errors["user_name"]}
                                        helperText={
                                            errors["user_name"]
                                                ? errors["user_name"].message
                                                : ""
                                        }
                                        {...register("user_name")}
                                    />
                                ) : (
                                    <>
                                        <strong>Name: </strong>
                                        {profile.user_name}
                                    </>
                                )}
                            </Typography>
                            <Typography variant="p">
                                {isEdit ? (
                                    <>
                                        <Typography
                                            variant="h6"
                                            component="h6"
                                            sx={{ mb: 2 }}
                                        >
                                            Change Password
                                        </Typography>
                                        <TextField
                                            size="small"
                                            sx={{ mb: 2 }}
                                            label="Current Password"
                                            fullWidth
                                            type="password"
                                            error={
                                                !!errors["user_old_password"]
                                            }
                                            helperText={
                                                errors["user_old_password"]
                                                    ? errors[
                                                          "user_old_password"
                                                      ].message
                                                    : ""
                                            }
                                            {...register("user_old_password")}
                                        />
                                        <TextField
                                            size="small"
                                            sx={{ mb: 2 }}
                                            label="New Password"
                                            fullWidth
                                            type="password"
                                            error={!!errors["new_password"]}
                                            helperText={
                                                errors["new_password"]
                                                    ? errors["new_password"]
                                                          .message
                                                    : ""
                                            }
                                            {...register("new_password")}
                                        />
                                        <TextField
                                            size="small"
                                            sx={{ mb: 2 }}
                                            label="Confirm Password"
                                            fullWidth
                                            type="password"
                                            error={!!errors["user_password"]}
                                            helperText={
                                                errors["user_password"]
                                                    ? errors["user_password"]
                                                          .message
                                                    : ""
                                            }
                                            {...register("user_password")}
                                        />
                                    </>
                                ) : (
                                    ""
                                )}
                            </Typography>
                            <Typography variant="p">
                                <strong>Email: </strong> {profile.user_email}
                            </Typography>
                            <Typography variant="p">
                                <strong>Role: </strong> {currentUser.data.role}
                            </Typography>
                            {isEdit ? (
                                <Grid container justifyContent={"center"}>
                                    <LoadingButton
                                        sx={{ my: 2 }}
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        Update Profile
                                    </LoadingButton>
                                </Grid>
                            ) : (
                                ""
                            )}
                        </Grid>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Profile;
