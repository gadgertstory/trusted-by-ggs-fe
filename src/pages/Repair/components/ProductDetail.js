import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import Dropzone from "react-dropzone-uploader";
import { getDroppedOrSelectedFiles } from "html5-file-selector";

import {
    FormHelperText,
    FormControl,
    Grid,
    Paper,
    Select,
    MenuItem,
    InputLabel,
    TextField,
    Typography,
} from "@mui/material";

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
    }, [fileObject, imagesLastRepair]);

    const getUploadParams = ({ meta }) => {
        const url = "https://httpbin.org/post";
        return {
            url,
            meta: { fileUrl: `${url}/${encodeURIComponent(meta.name)}` },
        };
    };

    const getFilesFromEvent = (e) => {
        return new Promise((resolve) => {
            getDroppedOrSelectedFiles(e).then((chosenFiles) => {
                resolve(chosenFiles.map((f) => f.fileObject));
            });
        });
    };

    const handleControlledDropzonChangeStatus = (status, allFiles) => {
        setTimeout(() => {
            if (["done", "removed"].includes(status)) {
                setFileObject([...allFiles]);
            }
        }, 0);
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
                        component="label"
                        variant="caption"
                        fontWeight={"bold"}
                    >
                        รูปภาพจากลูกค้า
                    </Typography>
                    <Controller
                        control={control}
                        name="fileObject"
                        render={({ onChange }) => (
                            <Dropzone
                                getUploadParams={getUploadParams}
                                // onChangeStatus={handleChangeStatus}
                                onChangeStatus={(
                                    fileObject,
                                    status,
                                    allFiles
                                ) => {
                                    handleControlledDropzonChangeStatus(
                                        status,
                                        allFiles,
                                        onChange
                                    );
                                }}
                                // onSubmit={handleSubmit}
                                dropzoneDisabled
                                maxFiles={3}
                                inputContent="เพิ่ม 3 รูปภาพ"
                                inputWithFilesContent={(files) =>
                                    `${3 - files.length} more`
                                }
                                accept="image/*"
                                submitButtonDisabled={(files) =>
                                    files.length < 3
                                }
                                getFilesFromEvent={getFilesFromEvent}
                                disabled={!onEdit}
                            />
                        )}
                    />
                    <Typography
                        component="label"
                        variant="caption"
                        fontWeight={"bold"}
                    >
                        ชื่อภาพ
                    </Typography>
                    {/* {id === "new" ? (
                        <ol>
                            {fileObject?.map((file) => (
                                <Typography
                                    variant="caption"
                                    key={file.meta.id}
                                >
                                    <li>{file.meta.name}</li>
                                </Typography>
                            ))}
                        </ol>
                    ) : (
                        <ol>
                            {fileObject?.map((file) => (
                                <Typography
                                    variant="caption"
                                    key={file.image_id}
                                >
                                    <li>{file.original_name}</li>
                                </Typography>
                            ))}
                        </ol>
                    )} */}
                </Grid>
                <Grid item xs={6}>
                    <Typography
                        component="label"
                        variant="caption"
                        fontWeight={"bold"}
                    >
                        รูปภาพก่อนซ่อม
                    </Typography>
                    <Controller
                        control={control}
                        name="filesLastRepair"
                        render={({ onChange }) => (
                            <Dropzone
                                getUploadParams={getUploadParams}
                                // onChangeStatus={handleChangeStatus}
                                onChangeStatus={(
                                    filesLastRepair,
                                    status,
                                    allFiles
                                ) => {
                                    handleControlledDropzonChangeStatus(
                                        status,
                                        allFiles,
                                        onChange
                                    );
                                }}
                                // onSubmit={handleSubmit}
                                dropzoneDisabled
                                maxFiles={3}
                                inputContent="เพิ่ม 3 รูปภาพ"
                                inputWithFilesContent={(files) =>
                                    `${3 - files.length} more`
                                }
                                accept="image/*"
                                submitButtonDisabled={(files) =>
                                    files.length < 3
                                }
                                getFilesFromEvent={getFilesFromEvent}
                                disabled={!onEdit}
                            />
                        )}
                    />
                    <Typography
                        component="label"
                        variant="caption"
                        fontWeight={"bold"}
                    >
                        ชื่อภาพ
                    </Typography>
                    {/* <ol>
                        {fileObject?.map((file) => (
                            <Typography
                                variant="caption"
                                key={file.meta.id}
                            >
                                <li>{file.meta.name}</li>
                            </Typography>
                        ))}
                    </ol> */}
                </Grid>
                <Grid item xs={6}>
                    <Typography
                        component="label"
                        variant="caption"
                        fontWeight={"bold"}
                    >
                        รูปภาพหลังซ่อม
                    </Typography>
                    <Controller
                        control={control}
                        name="imagesLastRepair"
                        render={({ onChange }) => (
                            <Dropzone
                                getUploadParams={getUploadParams}
                                // onChangeStatus={handleChangeStatus}
                                onChangeStatus={(
                                    imagesLastRepair,
                                    status,
                                    allFiles
                                ) => {
                                    handleControlledDropzonChangeStatus(
                                        status,
                                        allFiles,
                                        onChange
                                    );
                                }}
                                // onSubmit={handleSubmit}
                                dropzoneDisabled
                                maxFiles={3}
                                inputContent="เพิ่ม 3 รูปภาพ"
                                inputWithFilesContent={(files) =>
                                    `${3 - files.length} more`
                                }
                                accept="image/*"
                                submitButtonDisabled={(files) =>
                                    files.length < 3
                                }
                                getFilesFromEvent={getFilesFromEvent}
                                disabled={!onEdit}
                            />
                        )}
                    />
                    <Typography
                        component="label"
                        variant="caption"
                        fontWeight={"bold"}
                    >
                        ชื่อภาพ
                    </Typography>
                    {/* <ol>
                        {imagesLastRepair?.map((file) => (
                            <Typography variant="caption" key={file.meta.id}>
                                <li>{file.meta.name}</li>
                            </Typography>
                        ))}
                    </ol> */}
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
