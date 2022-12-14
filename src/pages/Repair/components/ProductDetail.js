import React from "react";
import { Controller } from "react-hook-form";

import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

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
import InputUploadImage from "../../../components/InputUploadImage";

const ProductDetail = (props) => {
    const {
        id,
        control,
        returnDate,
        receivedDate,
        notifiedDate,
        betweenRepair,
        beforeRepair,
        afterRepair,
        afterCustomer,
        setReceivedDate,
        setReturnDate,
        setNotifiedDate,
        setBeforeRepair,
        setBetweenRepair,
        setAfterRepair,
        onSelectReceivedDate,
        onSelectReturnDate,
        onSelectNotifiedDate,
        onSelectBetweenRepair,
        onSelectBeforeRepair,
        onSelectAfterRepair,
        onEdit,
        brandList,
        statusList,
        roleUser,
        onDateError,
        onImageError,
        setImageError,
        notifiedDateError,
        receivedDateError,
        returnDateError,
        classes,
    } = props;

    const handleReceivedDateChange = (receivedDate) => {
        setReceivedDate(receivedDate);
        onSelectReceivedDate(receivedDate);
    };

    const handleReturnDateChange = (returnDate) => {
        setReturnDate(returnDate);
        onSelectReturnDate(returnDate);
    };

    const handleNotifiedDateChange = (notifiedDate) => {
        setNotifiedDate(notifiedDate);
        onSelectNotifiedDate(notifiedDate);
    };

    React.useEffect(() => {
        onSelectBeforeRepair(beforeRepair);
        onSelectBetweenRepair(betweenRepair);
        onSelectAfterRepair(afterRepair);
    }, [betweenRepair, beforeRepair, afterCustomer]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleDateChange = (e) => {
        if (e) {
            e.preventDefault();
        }
    };

    return (
        <Paper
            sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <h2>???????????????????????????????????????????????????</h2>
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
                                disabled={
                                    !onEdit || roleUser.roleUser.role === "user"
                                }
                                onChange={onChange}
                                value={value}
                                required
                                fullWidth={true}
                                label="?????????????????????????????????"
                                error={!!error}
                                helperText={error ? error.message : null}
                                inputProps={{
                                    maxLength: 100,
                                }}
                            />
                        )}
                        rules={{ required: "????????????????????????????????????????????????????????????" }}
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
                                label="??????????????????????????????????????????/Serial Number"
                                error={!!error}
                                helperText={error ? error.message : null}
                                inputProps={{
                                    maxLength: 50,
                                }}
                            />
                        )}
                        rules={{
                            required: "?????????????????????????????????????????????????????????????????????/Serial Number",
                            pattern: {
                                value: /^[A-Z0-9a-z-]+$/i,
                                message:
                                    "?????????????????? ??????????????????????????????????????????/Serial Number ??????????????????????????????",
                            },
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
                            <FormControl
                                fullWidth
                                required
                                error={!!error}
                                className={classes.formControl}
                            >
                                <InputLabel id="demo-simple-select-required-label">
                                    Brand
                                </InputLabel>
                                <Select
                                    disabled={
                                        !onEdit ||
                                        roleUser.roleUser.role === "user"
                                    }
                                    size="small"
                                    value={value}
                                    label="Brand"
                                    onChange={onChange}
                                    error={!!error}
                                    MenuProps={{
                                        classes: { paper: classes.menuPaper },
                                    }}
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
                            required: "?????????????????????????????? Brand",
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputUploadImage
                        activeUpload={"all"}
                        label={"?????????????????????????????????????????? (????????????????????? ????????????????????? 3 ?????????)"}
                        imagesList={beforeRepair}
                        onEdit={onEdit}
                        setImagesList={setBeforeRepair}
                        onImageError={onImageError}
                        setImageError={setImageError}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputUploadImage
                        label={"??????????????????????????????????????????????????? (????????????????????? ????????????????????? 3 ?????????)"}
                        imagesList={betweenRepair}
                        onEdit={onEdit}
                        setImagesList={setBetweenRepair}
                        onImageError={onImageError}
                        setImageError={setImageError}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputUploadImage
                        label={"?????????????????????????????????????????? (????????????????????? ????????????????????? 3 ?????????)"}
                        imagesList={afterRepair}
                        onEdit={onEdit}
                        setImagesList={setAfterRepair}
                        onImageError={onImageError}
                        setImageError={setImageError}
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
                                label="???????????????????????????????????????????????????/???????????????"
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
                                label="????????????????????????"
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
                                <FormControl
                                    className={classes.formControl}
                                    fullWidth
                                >
                                    <InputLabel id="demo-simple-select-required-label">
                                        ????????????????????????????????????
                                    </InputLabel>
                                    <Select
                                        disabled={!onEdit}
                                        size="small"
                                        value={value}
                                        label="Status"
                                        onChange={onChange}
                                        MenuProps={{
                                            classes: {
                                                paper: classes.menuPaper,
                                            },
                                        }}
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
                            label="????????????????????????????????????????????????"
                            inputFormat="dd/MM/yyyy"
                            value={notifiedDate}
                            onChange={handleNotifiedDateChange}
                            disabled={!onEdit}
                            renderInput={(params) => (
                                <TextField
                                    onKeyDown={handleDateChange}
                                    fullWidth
                                    size="small"
                                    {...params}
                                />
                            )}
                        />
                    </LocalizationProvider>
                    {onDateError(notifiedDateError)}
                </Grid>
                <Grid item xs={12} md={3}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="???????????????????????????????????????"
                            inputFormat="dd/MM/yyyy"
                            value={receivedDate}
                            onChange={handleReceivedDateChange}
                            disabled={!onEdit}
                            renderInput={(params) => (
                                <TextField
                                    onKeyDown={handleDateChange}
                                    fullWidth
                                    size="small"
                                    {...params}
                                />
                            )}
                        />
                    </LocalizationProvider>
                    {onDateError(receivedDateError)}
                </Grid>
                <Grid item xs={12} md={3}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="????????????????????????????????????"
                            inputFormat="dd/MM/yyyy"
                            value={returnDate}
                            onChange={handleReturnDateChange}
                            disabled={!onEdit}
                            renderInput={(params) => (
                                <TextField
                                    onKeyDown={handleDateChange}
                                    fullWidth
                                    size="small"
                                    {...params}
                                />
                            )}
                        />
                    </LocalizationProvider>
                    {onDateError(returnDateError)}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ProductDetail;
