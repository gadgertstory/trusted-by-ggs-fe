import React, { useState } from "react";
import { useDispatch } from "react-redux";

import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";

import { useForm } from "react-hook-form";
import { Box, Link, Typography, Container } from "@mui/material";

import { history } from "../../helpers/history";
import { forgotPassword } from "../../services/actions/auth";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const ForgotPassword = () => {
    const schema = Yup.object().shape({
        user_email: Yup.string()
            .required("Email is required")
            .email("Please enter a valid email"),
    });

    const formOptions = { resolver: yupResolver(schema) };
    const dispatch = useDispatch();
    const { handleSubmit, register, formState } = useForm(formOptions);
    const { errors } = formState;

    const [loading, setLoading] = useState(false);

    const onSubmit = (email) => {
        setLoading(true);
        setTimeout(() => {
            dispatch(forgotPassword(email));
            clearTimeout(setLoading(false))
        }, 1000 * 5);
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
                <Typography variant="h4" fontWeight={"bold"}>
                    Forgot Password
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email"
                        autoComplete="email"
                        autoFocus
                        type="email"
                        error={!!errors["user_email"]}
                        helperText={
                            errors["user_email"]
                                ? errors["user_email"].message
                                : ""
                        }
                        {...register("user_email")}
                    />
                    <Link
                        href="#"
                        onClick={() => {
                            setLoading(true);
                            history.push("/login");
                        }}
                    >
                        Remember your password?
                    </Link>
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ my: 2 }}
                        loading={loading}
                    >
                        Send your email
                    </LoadingButton>
                </Box>
            </Box>
        </Container>
    );
};

export default ForgotPassword;
