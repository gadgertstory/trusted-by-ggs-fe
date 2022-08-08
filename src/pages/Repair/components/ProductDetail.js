import React from "react";
import { Controller } from "react-hook-form";

import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import {
    FormHelperText,
    FormControl,
    Grid,
    Paper,
    Select,
    MenuItem,
    InputLabel,
    TextField,
} from "@mui/material";

import Input from "../../../components/Input";

const ProductDetail = (props) => {
    const {
        id,
        control,
        returnDate,
        receivedDate,
        notifiedDate,
        setReceivedDate,
        setReturnDate,
        setNotifiedDate,
        setError,
        onSelectReceivedDate,
        onSelectReturnDate,
        onSelectNotifiedDate,
        onEdit,
        brandList,
        statusList,
        roleUser
    } = props;

    const handleReceivedDateChange = (receivedDate) => {
        setReceivedDate(receivedDate);
        onSelectReceivedDate(receivedDate);
        setError("");
    };

    const handleReturnDateChange = (returnDate) => {
        setReturnDate(returnDate);
        onSelectReturnDate(returnDate);
        setError("");
    };
    
    const handleNotifiedDateChange = (notifiedDate) => {
        setNotifiedDate(notifiedDate);
        onSelectNotifiedDate(notifiedDate);
        setError("");
    };

    return (
        <Paper
            sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <h2>รายละเอียดการซ่อม</h2>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Controller
                        name="product_name"
                        control={control}
                        defaultValue=""
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <Input
                                disabled={!onEdit || roleUser.roleUser.role ==='user'}
                                onChange={onChange}
                                value={value}
                                required
                                fullWidth={true}
                                label="ชื่ออุปกรกรณ์"
                                error={!!error}
                                helperText={error ? error.message : null}
                                inputProps={{
                                    maxLength: 100,
                                }}
                            />
                        )}
                        rules={{ required: "กรุณากรอกชื่ออุปกรกรณ์" }}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Controller
                        name="product_serial_no"
                        control={control}
                        defaultValue=""
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <Input
                                disabled={!onEdit || id !== "new"}
                                onChange={onChange}
                                value={value}
                                required
                                fullWidth={true}
                                label="หมายเลขเครื่อง/Serial Number"
                                error={!!error}
                                helperText={error ? error.message : null}
                                inputProps={{
                                    maxLength: 50,
                                }}
                            />
                        )}
                        rules={{
                            required: "กรุณากรอกหมายเลขเครื่อง/Serial Number",
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Controller
                        name="brand_id"
                        required
                        control={control}
                        defaultValue=""
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <FormControl fullWidth required error={!!error}>
                                <InputLabel id="demo-simple-select-required-label">
                                    Brand
                                </InputLabel>
                                <Select
                                    disabled={!onEdit || roleUser.roleUser.role ==='user'}
                                    size="small"
                                    value={value}
                                    label="Brand"
                                    onChange={onChange}
                                    error={!!error}
                                >
                                    {brandList?.map((item) => {
                                        return (
                                            <MenuItem
                                                key={item.brand_code}
                                                value={item.brand_id}
                                            >
                                                {item.brand_name}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText error>
                                    {error ? error.message : null}
                                </FormHelperText>
                            </FormControl>
                        )}
                        rules={{
                            required: "กรุณาเลือก Brand",
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="description"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <Input
                                disabled={!onEdit}
                                onChange={onChange}
                                value={value}
                                fullWidth={true}
                                label="รายละเอียดการซ่อม/ปัญหา"
                                multiline
                                rows={5}
                                inputProps={{
                                    maxLength: 1000,
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="remark"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <Input
                                disabled={!onEdit}
                                onChange={onChange}
                                value={value}
                                fullWidth={true}
                                label="หมายเหตุ"
                                inputProps={{
                                    maxLength: 200,
                                }}
                            />
                        )}
                    />
                </Grid>
                {id !== "new" ? (
                    <Grid item xs={12} md={3}>
                        <Controller
                            name="status_id"
                            required
                            control={control}
                            defaultValue=""
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-required-label">
                                        สถานะการซ่อม
                                    </InputLabel>
                                    <Select
                                        disabled={!onEdit}
                                        size="small"
                                        value={value}
                                        label="Status"
                                        onChange={onChange}
                                    >
                                        {statusList?.map((item) => {
                                            return (
                                                <MenuItem
                                                    key={item.status_id}
                                                    value={item.status_id}
                                                >
                                                    {item.status_name}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Grid>
                ) : (
                    ""
                )}
                <Grid item xs={12} md={3}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="วันที่แจ้งเรื่อง"
                            inputFormat="dd/MM/yyyy"
                            value={notifiedDate}
                            onChange={handleNotifiedDateChange}
                            disabled={!onEdit || id !== "new"}
                            renderInput={(params) => (
                                <TextField fullWidth size="small" {...params} />
                            )}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={3}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="วันที่รับซ่อม"
                            inputFormat="dd/MM/yyyy"
                            value={receivedDate}
                            onChange={handleReceivedDateChange}
                            disabled={!onEdit || id !== "new"}
                            renderInput={(params) => (
                                <TextField fullWidth size="small" {...params} />
                            )}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={3}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="วันที่นัดรับ"
                            inputFormat="dd/MM/yyyy"
                            value={returnDate}
                            onChange={handleReturnDateChange}
                            disabled={!onEdit || roleUser.roleUser.role ==='user'}
                            renderInput={(params) => (
                                <TextField fullWidth size="small" {...params} />
                            )}
                        />
                    </LocalizationProvider>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ProductDetail;
