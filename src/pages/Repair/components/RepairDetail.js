import React, { useState, useEffect } from "react";
import Input from "../../../components/Input";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ThailandAddress from "../../../components/InputAddress";
import { useForm, Controller } from "react-hook-form";

import FeedIcon from "@mui/icons-material/Feed";
import {
    Button,
    Stack,
    Box,
    Typography,
    FormHelperText,
    FormControl,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { history } from "../../../helpers/history";

const RepairDetail = () => {
    const { handleSubmit, control } = useForm();
    const { id } = useParams();
    const [error, setError] = useState("");
    const [newData, setNewData] = useState({});

    //AddressForm state
    const [subdistrict, setSubDistrict] = useState("");
    const [district, setDistrict] = useState("");
    const [province, setProvince] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [fullAddress, setFullAddress] = useState({});

    useEffect(() => {
        if(id === 'new'){

        }
    },[]);

    useEffect(() => {
        setFullAddress({
            subdistrict,
            district,
            province,
            zipcode,
        });
        setNewData({
            customer_subdistrict: subdistrict,
            customer_district: district,
            customer_province: province,
            customer_zipcode: zipcode,
        });
    }, [subdistrict, district, province, zipcode]);

    const onSubmit = (data) => {

        if (!subdistrict || !district || !province || !zipcode) {
            setError("กรุณากรอกข้อมูลให้ครบ");
            return;
        }
        const _data = Object.assign(data, newData);
        console.log(_data);

    };

    const onSelect = (fulladdress) => {
        const { subdistrict, district, province, zipcode } = fulladdress;
        setSubDistrict(subdistrict);
        setDistrict(district);
        setProvince(province);
        setZipcode(zipcode);
        setFullAddress({
            subdistrict,
            district,
            province,
            zipcode,
        });

        setError("");
    };

    const onError = () => {
        return (
            <>
                {error ? (
                    <FormControl>
                        <FormHelperText error>{error}</FormHelperText>
                    </FormControl>
                ) : (
                    ""
                )}
            </>
        );
    };

    return (
        <>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{ mt: 1 }}
            >
                <Grid
                    container
                    flexDirection="row"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item>
                        <FeedIcon fontSize="large" />
                    </Grid>
                    <Grid item>
                        <h2>รับซ่อม</h2>
                    </Grid>
                </Grid>
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
                                        required={true}
                                        fullWidth
                                        label="ชื่อ"
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        helperText={
                                            error ? error.message : null
                                        }
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
                                        required={true}
                                        fullWidth
                                        label="นามสกุล"
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        helperText={
                                            error ? error.message : null
                                        }
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
                                        required={true}
                                        fullWidth
                                        label="เบอร์โทรศัพท์"
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        type="number"
                                        helperText={
                                            error ? error.message : null
                                        }
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
                                        onChange={onChange}
                                        value={value}
                                        required
                                        fullWidth={true}
                                        label="บ้านเลขที่ / อาคาร / ซอย / ถนน"
                                        error={!!error}
                                        helperText={
                                            error ? error.message : null
                                        }
                                    />
                                )}
                                rules={{
                                    required:
                                        "กรุณากรอกบ้านเลขที่ / อาคาร / ซอย / ถนน",
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ width: "100%" }}>
                            <Typography component="label" variant="caption">
                                แขวง / ตำบล*
                            </Typography>
                            <ThailandAddress
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
                <Paper
                    sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <h2>รายละเอียดการซ่อม</h2>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="product_name"
                                control={control}
                                defaultValue=""
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <Input
                                        onChange={onChange}
                                        value={value}
                                        required
                                        fullWidth={true}
                                        label="ชื่ออุปกรกรณ์"
                                        error={!!error}
                                        helperText={
                                            error ? error.message : null
                                        }
                                    />
                                )}
                                rules={{ required: "กรุณากรอกชื่ออุปกรกรณ์" }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="product_serial_no"
                                control={control}
                                defaultValue=""
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <Input
                                        onChange={onChange}
                                        value={value}
                                        required
                                        fullWidth={true}
                                        label="หมายเลขเครื่อง/Serial Number"
                                        error={!!error}
                                        helperText={
                                            error ? error.message : null
                                        }
                                    />
                                )}
                                rules={{
                                    required:
                                        "กรุณากรอกหมายเลขเครื่อง/Serial Number",
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
                                        onChange={onChange}
                                        value={value}
                                        fullWidth={true}
                                        label="รายละเอียดการซ่อม/ปัญหา"
                                        multiline
                                        rows={5}
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
                                        onChange={onChange}
                                        value={value}
                                        fullWidth={true}
                                        label="หมายเหตุ"
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                </Paper>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <Button
                        sx={{
                            my: 2,
                            bgcolor: "background.default",
                            color: "text.primary",
                            ":hover": {
                                bgcolor: "background.default",
                            },
                        }}
                        variant="contained"
                        onClick={() => {
                            history.push("/repair");
                            window.location.reload();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        sx={{ my: 2 }}
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Submit
                    </Button>
                </Stack>
            </Box>
        </>
    );
};

export default RepairDetail;
