import React from "react";
import { Controller } from "react-hook-form";

import {
    Grid,
    Paper,
    Typography,
    FormHelperText,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
} from "@mui/material";

import Input from "../../../components/Input";
import {
    receiveMethodList,
    warantyStatusList,
} from "../../../dataMock/master";

import ThailandAddress from "../../../components/InputAddress";

const CustomerDetail = (props) => {
    const {
        control,
        onError,
        subdistrict,
        setSubDistrict,
        district,
        setDistrict,
        province,
        setProvince,
        zipcode,
        setZipcode,
        setError,
        onSelect,
        onEdit,
        roleUser,
    } = props;

    return (
        <Paper
            sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                mb: 3,
            }}
        >
            <h2>รายละเอียดลูกค้า</h2>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Controller
                        name="customer_firstname"
                        control={control}
                        defaultValue=""
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <Input
                                disabled={
                                    !onEdit || roleUser.roleUser.role === "user"
                                }
                                required={true}
                                fullWidth
                                label="ชื่อ"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                inputProps={{
                                    maxLength: 150,
                                }}
                            />
                        )}
                        rules={{ required: "กรุณากรอกชื่อ" }}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Controller
                        name="customer_lastname"
                        control={control}
                        defaultValue=""
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <Input
                                disabled={
                                    !onEdit || roleUser.roleUser.role === "user"
                                }
                                required={true}
                                fullWidth
                                label="นามสกุล"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                inputProps={{
                                    maxLength: 150,
                                }}
                            />
                        )}
                        rules={{ required: "กรุณากรอกนามสุกล" }}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Controller
                        name="customer_tel"
                        control={control}
                        defaultValue=""
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <Input
                                disabled={
                                    !onEdit || roleUser.roleUser.role === "user"
                                }
                                required={true}
                                fullWidth
                                label="เบอร์โทรศัพท์"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                type="string"
                                inputProps={{
                                    maxLength: 10,
                                }}
                                helperText={error ? error.message : null}
                            />
                        )}
                        rules={{
                            required: "กรุณากรอกเบอร์โทรศัพท์",
                            pattern: {
                                value: /^[0-9]+$/,
                                message: "กรุณาใส่ตัวเลขเท่านั้น",
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="customer_house_no"
                        control={control}
                        defaultValue=""
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <Input
                                disabled={
                                    !onEdit || roleUser.roleUser.role === "user"
                                }
                                onChange={onChange}
                                value={value}
                                required
                                fullWidth={true}
                                label="บ้านเลขที่ / อาคาร / ซอย / ถนน"
                                error={!!error}
                                helperText={error ? error.message : null}
                                inputProps={{
                                    maxLength: 250,
                                }}
                            />
                        )}
                        rules={{
                            required: "กรุณากรอกบ้านเลขที่ / อาคาร / ซอย / ถนน",
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6} sx={{ width: "100%" }}>
                    <Typography component="label" variant="caption">
                        แขวง / ตำบล*
                    </Typography>
                    <ThailandAddress
                        disabled={!onEdit || roleUser.roleUser.role === "user"}
                        style={{ width: "100%" }}
                        address="subdistrict"
                        value={subdistrict}
                        onChange={(e) => {
                            setSubDistrict(e.target.value);
                            setError("");
                        }}
                        onSelect={onSelect}
                    />
                    {onError()}
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography component="label" variant="caption">
                        เขต / อำเภอ*
                    </Typography>
                    <ThailandAddress
                        disabled
                        style={{ width: "100%" }}
                        address="district"
                        value={district}
                        onChange={(e) => {
                            setDistrict(e.target.value);
                            setError("");
                        }}
                        onSelect={onSelect}
                    />
                    {onError()}
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography component="label" variant="caption">
                        จังหวัด*
                    </Typography>
                    <ThailandAddress
                        disabled
                        style={{ width: "100%", outlineStyle: "none" }}
                        address="province"
                        value={province}
                        onChange={(e) => {
                            setProvince(e.target.value);
                            setError("");
                        }}
                        onSelect={onSelect}
                    />
                    {onError()}
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography component="label" variant="caption">
                        ไปรษณีย์*
                    </Typography>
                    <ThailandAddress
                        disabled
                        style={{ width: "100%", outlineStyle: "none" }}
                        address="zipcode"
                        value={zipcode}
                        onChange={(e) => {
                            setZipcode(e.target.value);
                            setError("");
                        }}
                        onSelect={onSelect}
                    />
                    {onError()}
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="receive_method"
                        required
                        control={control}
                        defaultValue=""
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <FormControl fullWidth required error={!!error}>
                                <InputLabel id="demo-simple-select-required-label">
                                    ช่องทางรับแจ้ง
                                </InputLabel>
                                <Select
                                    disabled={
                                        !onEdit ||
                                        roleUser.roleUser.role === "user"
                                    }
                                    size="small"
                                    value={value}
                                    label="ช่องทางรับแจ้ง"
                                    onChange={onChange}
                                    error={!!error}
                                >
                                    {receiveMethodList?.map((item) => {
                                        return (
                                            <MenuItem
                                                key={item.status_id}
                                                value={item.status_name}
                                            >
                                                {item.status_name}
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
                            required: "กรุณาเลือก ช่องทางรับแจ้ง",
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="waranty_status"
                        required
                        control={control}
                        defaultValue=""
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <FormControl fullWidth required error={!!error}>
                                <InputLabel id="demo-simple-select-required-label">
                                    ระยะเวลาประกัน
                                </InputLabel>
                                <Select
                                    disabled={
                                        !onEdit ||
                                        roleUser.roleUser.role === "user"
                                    }
                                    size="small"
                                    value={value}
                                    label="ระยะเวลาประกัน"
                                    onChange={onChange}
                                    error={!!error}
                                >
                                    {warantyStatusList?.map((item) => {
                                        return (
                                            <MenuItem
                                                key={item.status_id}
                                                value={item.status}
                                            >
                                                {item.status_name}
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
                            required: "กรุณาเลือก ระยะเวลาประกัน",
                        }}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default CustomerDetail;
