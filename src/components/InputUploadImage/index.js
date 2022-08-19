import React from "react";

import {
    Grid,
    Button,
    IconButton,
    Typography,
    Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const InputUploadImage = (props) => {
    const {
        label,
        imagesList,
        deleteImage,
        roleUser,
        onEdit,
        onImageError,
        uploadImage,
    } = props;

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
                                                    roleUser.roleUser.role ===
                                                        "user"
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
                                    roleUser.roleUser.role === "user"
                                }
                            >
                                <Box noWrap>เลือกรูป</Box>
                                <input
                                    hidden
                                    accept="image/*"
                                    multiple
                                    type="file"
                                    onChange={uploadImage}
                                />
                            </Button>
                        </Grid>
                        <Grid item>{onImageError()}</Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default InputUploadImage;
