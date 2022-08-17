import React, { useState } from "react";
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
    Button,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import Input from "../../../components/Input";

const ProductDetail = (props) => {
    const {
        id,
        control,
        returnDate,
        receivedDate,
        notifiedDate,
        fileObject,
        imagesLastRepair,
        setReceivedDate,
        setReturnDate,
        setNotifiedDate,
        setError,
        setFileObject,
        onSelectReceivedDate,
        onSelectReturnDate,
        onSelectNotifiedDate,
        onSelectFileObj,
        onSelectImagesLastRepair,
        onEdit,
        brandList,
        statusList,
        roleUser,
    } = props;
    const [file, setFile] = useState([]);

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

    React.useEffect(() => {
        console.log("file upload🚀", fileObject);

        onSelectFileObj(fileObject);
        onSelectImagesLastRepair(imagesLastRepair);
    }, [fileObject, imagesLastRepair]); // eslint-disable-line react-hooks/exhaustive-deps

    // function uploadSingleFile(e) {
    //     setFileObject([...fileObject, URL.createObjectURL(e.target.files[0])]);
    //     console.log("file", fileObject);
    // }

    function uploadSingleFile(e) {
        let ImagesArray = Object.entries(e.target.files).map((e) =>
            Object.assign(
                {},
                { file: e[1] },
                { previewUrl: URL.createObjectURL(e[1]) }
            )
        );
        // let ImagesObjectURL = Object.entries(e.target.files).map((e) =>
        //     URL.createObjectURL(e[1])
        // );
        console.log(ImagesArray);
        // console.log(ImagesObjectURL);
            setFileObject([...fileObject, ...ImagesArray]);
    }

    function deleteFile(e) {
        const s = fileObject.filter((item, index) => index !== e);
        setFileObject(s);
    }

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
                                disabled={
                                    !onEdit || roleUser.roleUser.role === "user"
                                }
                                onChange={onChange}
                                value={value}
                                required
                                fullWidth={true}
                                label="ชื่ออุปกรณ์"
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
                                    disabled={
                                        !onEdit ||
                                        roleUser.roleUser.role === "user"
                                    }
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
                <Grid item xs={6}>
                    <Typography
                        variant="caption"
                        color="initial"
                        fontWeight={"bold"}
                    >
                        รูปภาพจากลูกค้า
                    </Typography>
                    <Grid container direction={"row"} spacing={1}>
                        {/* {id !== "new" &&
                            fileObject?.length > 0 &&
                            fileObject?.map((item, index) => {
                                return (
                                    <Grid item>
                                        <img
                                            src={item.meta.previewUrl}
                                            alt=""
                                            width={100}
                                            height={"100%"}
                                        />
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => deleteFile(index)}
                                            color="error"
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </Grid>
                                );
                            })} */}

                        {fileObject?.length > 0 &&
                            fileObject?.map((item, index) => {
                                return (
                                    <Grid item key={index}>
                                        <Grid container spacing={0}>
                                            <Grid item>
                                                <img
                                                    src={item.previewUrl}
                                                    alt=""
                                                    width={100}
                                                    height={"100%"}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <IconButton
                                                    aria-label="delete"
                                                    onClick={() =>
                                                        deleteFile(index)
                                                    }
                                                    color="error"
                                                    sx={{
                                                        margin: "-12px -10px 0 0",
                                                    }}
                                                >
                                                    <CloseIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                );
                            })}
                    </Grid>

                    <div className="form-group">
                        <input
                            type="file"
                            disabled={fileObject.length === 3}
                            className="form-control"
                            onChange={uploadSingleFile}
                            multiple
                            style={{ display: "none" }}
                        />
                    </div>

                    <Button
                        sx={{ mt: 2 }}
                        variant="contained"
                        component="label"
                        disabled={fileObject.length === 3 || !onEdit}
                    >
                        เลือกรูป
                        <input
                            hidden
                            accept="image/*"
                            multiple
                            type="file"
                            onChange={uploadSingleFile}
                        />
                    </Button>
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
                            disabled={
                                !onEdit || roleUser.roleUser.role === "user"
                            }
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
