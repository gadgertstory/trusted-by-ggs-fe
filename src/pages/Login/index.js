import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import { Link } from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import {
    FormControl,
    IconButton,
    InputAdornment,
    FormHelperText,
} from "@mui/material";

import { history } from "../../helpers/history";
import { login } from "../../services/actions/auth";

//button

import { Visibility, VisibilityOff } from "@mui/icons-material";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://gadgetstory.co.th/">
                Gadgetstory
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const LogIn = () => {
    const dispatch = useDispatch();
    const [loading] = useState(false);
    const { handleSubmit, control } = useForm();

    const [values, setValues] = React.useState({
        password: "",
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onSubmit = (data) => {
        const loginUser = data;

        if (loginUser) {
            dispatch(login(loginUser));
        }
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
                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="p">
                    Trusted By GGS
                </Typography>
                <Typography variant="h5">Sign in</Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <Controller
                        name="email"
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
                                label="Email"
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
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <FormControl
                                fullWidth
                                variant="outlined"
                                error={!!error}
                                sx={{ mt: 2 }}
                            >
                                <InputLabel htmlFor="outlined-adornment-password">
                                    Password *
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={
                                        values.showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={value}
                                    fullWidth={true}
                                    onChange={onChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
                                                edge="end"
                                            >
                                                {values.showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password *"
                                />
                                <FormHelperText id="filled-weight-helper-text">
                                    {error ? error.message : null}
                                </FormHelperText>
                            </FormControl>
                        )}
                        rules={{ required: "Password required" }}
                    />
                    <Link href="#" onClick={()=>{
                        history.push("/forgot-password")
                    }}>Forgot Password</Link>
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ my: 2 }}
                        loading={loading}
                    >
                        Sign In
                    </LoadingButton>
                </Box>
                <Copyright sx={{ mt: 5, mb: 4 }} />
            </Box>
        </Container>
    );
};

export default LogIn;
