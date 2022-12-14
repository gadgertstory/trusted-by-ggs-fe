import React from "react";
import { Controller } from "react-hook-form";

import {
    Grid,
    Paper,
    FormHelperText,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
} from "@mui/material";

import Input from "../../../components/Input";
import {
    receiveMethodList,
    warrantyStatusList,
} from "../../../dataMock/master";

const CustomerDetail = (props) => {
    const {
        control,
        onEdit,
        roleUser,
        classes,
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
                        rules={{ required: "กรุณากรอกนามสกุล" }}
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
                <Grid item xs={12} md={6}>
                    <Controller
                        name="customer_subdistrict"
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
                                label="แขวง / ตำบล"
                                error={!!error}
                                helperText={error ? error.message : null}
                                inputProps={{
                                    maxLength: 100,
                                }}
                            />
                        )}
                        rules={{
                            required: "กรุณากรอกแขวง / ตำบล",
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="customer_district"
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
                                label="เขต / อำเภอ"
                                error={!!error}
                                helperText={error ? error.message : null}
                                inputProps={{
                                    maxLength: 100,
                                }}
                            />
                        )}
                        rules={{
                            required: "กรุณากรอกเขต / อำเภอ",
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="customer_province"
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
                                label="จังหวัด"
                                error={!!error}
                                helperText={error ? error.message : null}
                                inputProps={{
                                    maxLength: 100,
                                }}
                            />
                        )}
                        rules={{
                            required: "กรุณากรอกจังหวัด",
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="customer_zipcode"
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
                                label="รหัสไปรษณีย์"
                                error={!!error}
                                helperText={error ? error.message : null}
                                inputProps={{
                                    maxLength: 10,
                                }}
                            />
                        )}
                        rules={{
                            required: "กรุณากรอกรหัสไปรษณีย์",
                            pattern: {
                                value: /^[0-9]+$/,
                                message: "กรุณาใส่ตัวเลขเท่านั้น",
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="purchase_method"
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
                                label="ช่องทางการสั่งซื้อ"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                inputProps={{
                                    maxLength: 100,
                                }}
                            />
                        )}
                        rules={{ required: "กรุณากรอกช่องทางการสั่งซื้อ" }}
                    />
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
                            <FormControl
                                className={classes.formControl}
                                fullWidth
                                required
                                error={!!error}
                            >
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
                                    MenuProps={{
                                        classes: { paper: classes.menuPaper },
                                    }}
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
                        name="order_no"
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
                                label="เลขที่ออเดอร์ / เลขที่ทำรายการ"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                inputProps={{
                                    maxLength: 100,
                                }}
                            />
                        )}
                        rules={{
                            required: "กรุณากรอกเลขที่ออเดอร์ / เลขที่ทำรายการ",
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="warranty_status"
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
                                    {warrantyStatusList?.map((item) => {
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
                            required: "กรุณาเลือก ระยะเวลาประกัน",
                        }}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default CustomerDetail;
