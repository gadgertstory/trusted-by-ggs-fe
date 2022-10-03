import React, { useState } from "react";
import {
    Button,
    Box,
    Grid,
    Typography,
    Stack, 
} from "@mui/material";
import { Feed } from "@mui/icons-material";
import RoleDetail from "./components/RoleDetail";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";

const ManageRole = (roleUser) => {
    const { control } = useForm();


    const [loading, setLoading] = useState(false);

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
                                กำหนดสิทธิ์ผู้ใช้งาน
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <RoleDetail
                control={control}
                /> 
            </Box>
        </>
    );
};

export default ManageRole;
