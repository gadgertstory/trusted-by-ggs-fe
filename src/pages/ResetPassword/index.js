import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Typography, Container, TextField } from "@mui/material";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { resetPassword } from "../../services/actions/auth";

const ResetPassword = () => {
    const validationSchema = Yup.object().shape(
        {
            new_password: Yup.string()
                .required("New Password is a required")
                .min(8, "Password must be at least 8 characters"),
            user_password: Yup.string().oneOf(
                [Yup.ref("new_password")],
                "Passwords must match"
            ),
        },
        [
            // Add Cyclic deps here because when require itself
            ["new_password"],
            ["user_password"],
        ]
    );
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const formOptions = { resolver: yupResolver(validationSchema) };

    const { handleSubmit, register, formState } = useForm(formOptions);
    const { errors } = formState;
    let [searchParams] = useSearchParams();

    const onSubmit = (password) => {
        setLoading(true);
       
        const queryHashParams = searchParams.get("h");
        const queryEmailParams = searchParams.get("e");

        const _newObjQuery = { queryHashParams, queryEmailParams };

        dispatch(resetPassword(password.user_password,_newObjQuery));
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography variant="h5">Reset Password</Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        size="small"
                        sx={{ mb: 2 }}
                        label="New Password"
                        fullWidth
                        type="password"
                        error={!!errors["new_password"]}
                        helperText={
                            errors["new_password"]
                                ? errors["new_password"].message
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
                                ? errors["user_password"].message
                                : ""
                        }
                        {...register("user_password")}
                    />
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ my: 2 }}
                        loading={loading}
                    >
                        Reset Password
                    </LoadingButton>
                </Box>
            </Box>
        </Container>
    );
};

export default ResetPassword;
