import React from "react";
import { Controller } from "react-hook-form";

import { Grid, Paper, Typography } from "@mui/material";

import Input from "../../../components/Input";

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
        register,
        onEdit,
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
                                disabled={!onEdit}
                                required={true}
                                fullWidth
                                label="ชื่อ"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
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
                                disabled={!onEdit}
                                required={true}
                                fullWidth
                                label="นามสกุล"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
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
                                disabled={!onEdit}
                                required={true}
                                fullWidth
                                label="เบอร์โทรศัพท์"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                type="number"
                                inputProps={{
                                    maxLength: 10,
                                  }}
                                helperText={error ? error.message : null}
                            />
                        )}
                        rules={{ required: "กรุณากรอกเบอร์โทรศัพท์" }}
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
                                disabled={!onEdit}
                                onChange={onChange}
                                value={value}
                                required
                                fullWidth={true}
                                label="บ้านเลขที่ / อาคาร / ซอย / ถนน"
                                error={!!error}
                                helperText={error ? error.message : null}
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
                        disabled={!onEdit}
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
            </Grid>
        </Paper>
    );
};

export default CustomerDetail;
