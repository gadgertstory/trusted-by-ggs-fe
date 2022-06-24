import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

import Avatar from "@mui/material/Avatar";
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from "@mui/material/TextField";
// import { ToastContainer, toast } from "react-toastify";

import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { login } from "../../services/actions/auth";
import { history } from "../../helpers/history";

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }


const LogIn = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { handleSubmit, control } = useForm();

    const { isLoggedIn } = useSelector((state) => state.auth);
    // const { message } = useSelector((state) => state.message);

    // const notify = (message) =>
    //     toast.error(`${message}`, {
    //         position: "top-right",
    //         autoClose: 1000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //     });

    const onSubmit = (data) => {
        const loginUser = data;
        console.log(loginUser);

        setLoading(true);

        if (loginUser) {
            dispatch(login(loginUser))
                .then(() => {
                    history.push("/");
                    window.location.reload();
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    };

    if (isLoggedIn) {
        return <Navigate to="/profile" />;
      }

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
                    Repair System
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
                                label="Email Address"
                                autoComplete="email"
                                autoFocus
                                size="small"
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
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                size="small"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                type="password"
                            />
                        )}
                        rules={{ required: "Password required" }}
                    />
                    
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ my: 2 }}
                        loading={loading}
                    >
                        Sign In
                    </LoadingButton>
                    {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
                </Box>
            </Box>
            {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
    );
};

export default LogIn;
