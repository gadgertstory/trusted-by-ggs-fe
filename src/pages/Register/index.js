import React, { useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import {
    Typography,
    Box,
    Paper,
    Grid,
    TextField,
    MenuItem,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { registerUser } from "../../services/actions/auth";

const roles = [
    { value: 1, label: "admin" },
    { value: 2, label: "superAdmin" },
];

const Register = () => {
    const validationSchema = Yup.object().shape({
        user_name: Yup.string().required("กรุณากรอก User Name"),
        user_email: Yup.string()
            .required("กรุณากรอก User Email")
            .email("รูปแบบ Email ไม่ถูกต้อง"),
        role: Yup.string().required("กรุณาเลือก Role"),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const dispatch = useDispatch();
    const { handleSubmit, register, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = (dataUser) => {
        const user_password = { user_password: "1234" };
        const _newData = { ...dataUser, ...user_password };

        dispatch(registerUser(_newData));
        // console.log(_newData);
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
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Typography variant="h4" component="h4" sx={{ mt: 2 }}>
                            Register User
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
                                <TextField
                                    size="small"
                                    sx={{ mb: 2 }}
                                    label="User Name"
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
                            </Typography>
                            <Typography variant="p">
                                <TextField
                                    size="small"
                                    sx={{ mb: 2 }}
                                    label="User Email"
                                    fullWidth
                                    type="text"
                                    error={!!errors["user_email"]}
                                    helperText={
                                        errors["user_email"]
                                            ? errors["user_email"].message
                                            : ""
                                    }
                                    {...register("user_email")}
                                />
                            </Typography>
                            <TextField
                                select
                                size="small"
                                id="role"
                                label="Role"
                                {...register("role")}
                                helperText={
                                    errors["role"] ? errors["role"].message : ""
                                }
                                error={!!errors["role"]}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                            >
                                {roles.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.label}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Grid container justifyContent={"center"}>
                                <LoadingButton
                                    sx={{ my: 2 }}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    Submit
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Register;
