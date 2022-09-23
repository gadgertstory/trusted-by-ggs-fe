import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";

import { useForm, Controller } from "react-hook-form";
import {
    Box,
    Link,
    Typography,
    Container,
} from "@mui/material";

import { history } from "../../helpers/history";
import { forgotPassword } from "../../services/actions/auth";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { handleSubmit, control } = useForm();

    const onSubmit = (email) => {
     dispatch(forgotPassword(email))
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
                <Typography variant="h5">Forgot Password</Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <Controller
                        name="user_email"
                        control={control}
                        defaultValue=""
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Email Address"
                                autoComplete="email"
                                autoFocus
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                type="email"
                            />
                        )}
                        rules={{ required: "Email required" }}
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
