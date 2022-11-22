import React from "react";

import { useSelector } from "react-redux";
import { Grid, Button, IconButton, Typography, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const InputUploadImage = (props) => {
    const {
        label,
        imagesList,
        onEdit,
        onImageError,
        setImagesList,
        setImageError,
        activeUpload,
    } = props;

    const { user: currentUser } = useSelector((state) => state.auth);

    function upload(e) {
        if (e.target.files.length <= 3) {
            let ImagesArray = Object.entries(e.target.files).map((e) =>
                Object.assign(
                    {},
                    { file: e[1] },
                    { previewUrl: URL.createObjectURL(e[1]) }
                )
            );
            let validateImage = Object.entries(e.target.files).map((e) => e[1]);
            validateImage?.forEach((type) => {
                if (
                    type.type === "image/png" ||
                    type.type === "image/jpeg" ||
                    type.type === "image/jpg" ||
                    type.type === "image/webp"
                ) {
                    return (
                        type.type,
                        setImagesList([...imagesList, ...ImagesArray]),
                        setImageError("")
                    );
                } else {
                    alert(
                        "กรุณาอัปโหลดไฟล์ .png, .jpeg, .jpg, .webp เท่านั้น!"
                    );
                    window.setTimeout(() => setImagesList([...imagesList]), 10);
                }
            });
            validateImage?.forEach((size) => {
                if (size.size < 5000000) {
                    return (
                        size.size,
                        setImagesList([...imagesList, ...ImagesArray]),
                        setImageError("")
                    );
                } else {
                    setImageError("กรุณาอัปโหลดรูปภาพขนาดไม่เกิน 1MB");
                }
            });
        } else {
            setImageError("กรุณาอัปโหลด ไม่เกิน 3 รูป");
        }
    }

    function deleteImage(e) {
        const s = imagesList.filter((item, index) => index !== e);
        setImagesList(s);
    }

    return (
        <>
            <Grid item xs={12}>
                <Typography
                    variant="caption"
                    color="initial"
                    fontWeight={"bold"}
                >
                    {label}
                </Typography>
                <Grid container direction={"row"} spacing={1}>
                    {imagesList?.length > 0 &&
                        imagesList?.map((item, index) => {
                            return (
                                <Grid item key={index}>
                                    <Grid container spacing={0}>
                                        <Grid item>
                                            <img
                                                src={item.previewUrl}
                                                alt=""
                                                width={250}
                                                height={"100%"}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <IconButton
                                                aria-label="delete"
                                                onClick={() =>
                                                    deleteImage(index)
                                                }
                                                color="error"
                                                sx={{
                                                    margin: "-12px -10px 0 0",
                                                }}
                                                disabled={
                                                    !onEdit ||
                                                    currentUser.data.role !==
                                                        "admin" ||
                                                    (currentUser.data.role !==
                                                        "superAdmin" &&
                                                        activeUpload === "all")
                                                }
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            );
                        })}
                </Grid>
                <Grid item>
                    <Grid
                        container
                        spacing={0}
                        direction={"column"}
                        width={"100%"}
                    >
                        <Grid item>
                            <Button
                                sx={{ mt: 2 }}
                                variant="contained"
                                component="label"
                                disabled={
                                    imagesList.length === 3 ||
                                    !onEdit ||
                                    (currentUser.data.role === "user" &&
                                        activeUpload === "all")
                                }
                            >
                                <Box noWrap>เลือกรูป</Box>
                                <input
                                    hidden
                                    accept="image/png,image/jpeg,image/jpg,image/webp"
                                    multiple
                                    type="file"
                                    onChange={upload}
                                />
                            </Button>
                        </Grid>
                        <Typography
                            variant="caption"
                            component="em"
                            color="initial"
                        >
                            (อัปโหลดเฉพาะไฟล์ .png, .jpeg, .jpg, .webp เท่านั้น)
                        </Typography>
                        <Grid item>{onImageError()}</Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default InputUploadImage;
