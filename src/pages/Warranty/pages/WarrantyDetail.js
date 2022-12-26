import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
    Button,
    ButtonGroup,
    Stack,
    Box,
    FormHelperText,
    FormControl,
    Grid,
    Typography,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Grow,
    ClickAwayListener,
    Skeleton,
    InputLabel,
    Select,
    TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { MoreVert, VerifiedUser } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import Input from "../../../components/Input";
import ConfirmDialog from "../../../components/Dialog/ConfirmDialog";

import { history } from "../../../helpers/history";
import {
    createWarranty,
    deleteWarranty,
    getWarrantyById,
    updateWarranty,
} from "../../../services/actions/warranty";
import { getAllBrand } from "../../../services/actions/brand";
import { getProfile } from "../../../services/actions/profile";
import { options } from "../../../dataMock/master";
import { convertISOtoGMT } from "../../../utils/ConvertDate";

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    menuPaper: {
        maxHeight: 150,
    },
}));

const WarrantyDetail = (props) => {
    const classes = useStyles();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { handleSubmit, control, setValue } = useForm();
    const { dataWarranty } = useSelector((state) => state.warranty);
    const { brandList = [] } = useSelector((state) => state.brand);
    const { profile } = useSelector((state) => state.profile);

    const [loading, setLoading] = useState(false);
    const [error] = useState("");

    //Dialog warning
    const [openConfirmRemoveRepair, setOpenConfirmRemoveRepair] =
        useState(false);

    //Dropdown
    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef(null);
    const [onEdit, setOnEdit] = useState();
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [placement, setPlacement] = React.useState();
    const [anchorEl, setAnchorEl] = React.useState(null);

    //DateInput
    const [startWarrantyDate, setStartWarrantyDate] = useState(null);
    const [startWarrantyDateError, setStartWarrantyDateError] = useState("");

    useEffect(() => {
        if (id !== "new") {
            dispatch(getWarrantyById(id));
        } else {
            setOnEdit(!onEdit);
        }
        dispatch(getAllBrand());
        dispatch(getProfile());
    }, [dispatch, id]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (dataWarranty) {
            setValue(
                "customer_firstname",
                dataWarranty.customer_firstname || ""
            );
            setValue("customer_lastname", dataWarranty.customer_lastname || "");
            setValue("customer_tel", dataWarranty.customer_tel || "");
            setValue("customer_email", dataWarranty.customer_email || "");
            setValue("product_name", dataWarranty.product_name || "");
            setValue("product_serial_no", dataWarranty.product_serial_no || "");
            setValue("brand_id", dataWarranty.brand?.brand_id || "");
            setValue("purchase_method", dataWarranty.purchase_method || "");
            if (dataWarranty.start_warranty_date) {
                setStartWarrantyDate(
                    convertISOtoGMT(dataWarranty.start_warranty_date)
                );
            }
        }
    }, [dataWarranty, setValue]);

    const onSubmit = (data) => {
        const newData = {};
        const _data = {
            user_id: profile.user_id,
            start_warranty_date: startWarrantyDate,
        };
        Object.assign(newData, data, _data);

        if (!startWarrantyDate) {
            setStartWarrantyDateError("กรุณากรอกวันที่เริ่มต้นรับประกัน");
            return;
        }
        if (!error) {
            setLoading(true);
        }
        if (id === "new") {
            dispatch(createWarranty(newData));
        } else {
            dispatch(updateWarranty(id, newData));
        }
    };

    const handleMenuItemClick = (event, index, option) => {
        if (option.name === "Edit") {
            setOnEdit(!onEdit);
            setSelectedIndex(index);
        } else {
            setOpenConfirmRemoveRepair(true);
        }
        setOpen(false);
    };

    const handleToggle = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const handleRemoveWarranty = () => {
        if (!error) {
            setLoading(true);
        }
        dispatch(deleteWarranty(id));
    };

    const handleStartWarrantyDateChange = (startWarrantyDate) => {
        setStartWarrantyDate(startWarrantyDate?.toISOString().split("T")[0]);
        setStartWarrantyDateError("");
    };

    const handleDateChange = (e) => {
        if (e) {
            e.preventDefault();
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
        >
            <Grid
                container
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >
                <Grid>
                    <Grid
                        container
                        flexDirection="row"
                        alignItems={"center"}
                        sx={{
                            p: 2,
                        }}
                    >
                        <VerifiedUser fontSize="large" />
                        <Typography variant="h4" component="h2">
                            เพิ่มข้อมูลการรับประกัน
                        </Typography>
                    </Grid>
                </Grid>
                {id === "new" ? (
                    ""
                ) : (
                    <Grid>
                        <ButtonGroup
                            variant="contained"
                            ref={anchorRef}
                            aria-label="split button"
                        >
                            <Button
                                size="small"
                                aria-controls={
                                    open ? "split-button-menu" : undefined
                                }
                                aria-expanded={open ? "true" : undefined}
                                aria-label="select merge strategy"
                                aria-haspopup="menu"
                                onClick={handleToggle("bottom-end")}
                            >
                                <MoreVert />
                            </Button>
                        </ButtonGroup>
                        <Popper
                            open={open}
                            anchorEl={anchorEl}
                            transition
                            placement={placement}
                            disablePortal
                            sx={{ zIndex: 2 }}
                        >
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{
                                        transformOrigin:
                                            placement === "right bottom"
                                                ? "center top"
                                                : "center bottom",
                                    }}
                                >
                                    <Paper>
                                        <ClickAwayListener
                                            onClickAway={handleClose}
                                        >
                                            <MenuList
                                                id="split-button-menu"
                                                autoFocusItem
                                            >
                                                {options.map(
                                                    (option, index) => (
                                                        <MenuItem
                                                            key={option.name}
                                                            selected={
                                                                index ===
                                                                selectedIndex
                                                            }
                                                            onClick={(event) =>
                                                                handleMenuItemClick(
                                                                    event,
                                                                    index,
                                                                    option
                                                                )
                                                            }
                                                        >
                                                            <Typography
                                                                variant="p"
                                                                component="p"
                                                                sx={{
                                                                    display:
                                                                        "flex",
                                                                    justifyContent:
                                                                        "center",
                                                                    aligItems:
                                                                        "center",
                                                                }}
                                                                color={
                                                                    option.name ===
                                                                        "Delete"
                                                                        ? "error.light"
                                                                        : ""
                                                                }
                                                            >
                                                                {option.name ===
                                                                    "Print" ? (
                                                                    ""
                                                                ) : (
                                                                    <>
                                                                        {
                                                                            option.icon
                                                                        }
                                                                        {
                                                                            option.name
                                                                        }
                                                                    </>
                                                                )}
                                                            </Typography>
                                                        </MenuItem>
                                                    )
                                                )}
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </Grid>
                )}
            </Grid>
            {loading ? (
                <Stack spacing={1}>
                    <Skeleton variant="text" height={40} width={200} />
                    <Skeleton
                        variant="rectangular"
                        width={"100%"}
                        height={200}
                    />
                    <Skeleton variant="text" height={40} width={200} />
                    <Skeleton
                        variant="rectangular"
                        width={"100%"}
                        height={100}
                    />
                </Stack>
            ) : (
                <>
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
                            <Grid item xs={12} md={6}>
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
                                            helperText={
                                                error ? error.message : null
                                            }
                                            inputProps={{
                                                maxLength: 150,
                                            }}
                                        />
                                    )}
                                    rules={{ required: "กรุณากรอกชื่อ" }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
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
                                            helperText={
                                                error ? error.message : null
                                            }
                                            inputProps={{
                                                maxLength: 150,
                                            }}
                                        />
                                    )}
                                    rules={{ required: "กรุณากรอกนามสกุล" }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
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
                                            type="string"
                                            inputProps={{
                                                maxLength: 10,
                                            }}
                                            helperText={
                                                error ? error.message : null
                                            }
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
                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="customer_email"
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
                                            label="อีเมล"
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            helperText={
                                                error ? error.message : null
                                            }
                                            inputProps={{
                                                maxLength: 100,
                                            }}
                                        />
                                    )}
                                    rules={{
                                        required: "กรุณากรอกเบอร์โทรศัพท์",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "รูปแบบอีเมลไม่ถูกต้อง",
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
                                            disabled={!onEdit}
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
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            mb: 3,
                        }}
                    >
                        <h2>รายละเอียดอุปกรณ์</h2>
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
                                            disabled={!onEdit}
                                            required={true}
                                            fullWidth
                                            label="ชื่ออุปกรณ์"
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            helperText={
                                                error ? error.message : null
                                            }
                                            inputProps={{
                                                maxLength: 150,
                                            }}
                                        />
                                    )}
                                    rules={{ required: "กรุณากรอกชื่ออุปกรณ์" }}
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
                                            disabled={!onEdit}
                                            required={true}
                                            fullWidth
                                            label="หมายเลขเครื่อง/Serial Number"
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            helperText={
                                                error ? error.message : null
                                            }
                                            inputProps={{
                                                maxLength: 150,
                                            }}
                                        />
                                    )}
                                    rules={{
                                        required:
                                            "กรุณากรอก หมายเลขเครื่อง/Serial Number",
                                        pattern: {
                                            value: /^[A-Z0-9a-z-]+$/i,
                                            message:
                                                "รูปแบบ หมายเลขเครื่อง/Serial Number ไม่ถูกต้อง",
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
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
                                            disabled={!onEdit}
                                            fullWidth
                                            required
                                            error={!!error}
                                            className={classes.formControl}
                                        >
                                            <InputLabel id="demo-simple-select-required-label">
                                                Brand
                                            </InputLabel>
                                            <Select
                                                size="small"
                                                value={value}
                                                label="Brand"
                                                onChange={onChange}
                                                error={!!error}
                                                MenuProps={{
                                                    classes: {
                                                        paper: classes.menuPaper,
                                                    },
                                                }}
                                            >
                                                {brandList?.map((item) => {
                                                    return (
                                                        <MenuItem
                                                            key={
                                                                item.brand_code
                                                            }
                                                            value={
                                                                item.brand_id
                                                            }
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
                            <Grid item xs={12} md={6}>
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                >
                                    <DesktopDatePicker
                                        label="วันที่เริ่มต้นรับประกัน"
                                        inputFormat="dd/MM/yyyy"
                                        value={startWarrantyDate}
                                        onChange={handleStartWarrantyDateChange}
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
                                {startWarrantyDateError ? (
                                    <FormControl>
                                        <FormHelperText error>
                                            {startWarrantyDateError}
                                        </FormHelperText>
                                    </FormControl>
                                ) : (
                                    ""
                                )}
                            </Grid>
                        </Grid>
                    </Paper>
                </>
            )}

            {onEdit ? (
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
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
                            history.push("/warranty?sn=");
                            window.location.reload();
                        }}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <LoadingButton
                        sx={{ my: 2 }}
                        variant="contained"
                        color="primary"
                        type="submit"
                        loading={loading}
                    >
                        Submit
                    </LoadingButton>
                </Stack>
            ) : (
                ""
            )}
            <ConfirmDialog
                open={openConfirmRemoveRepair}
                onClose={() => setOpenConfirmRemoveRepair(false)}
                title={`ยืนยันการลบข้อมูล!`}
                description={`ลบข้อมูลฟอร์มการรับประกัน`}
                buttonConfirmText={"ยืนยันการลบ"}
                buttonConfirmStyle={{
                    backgroundColor: "error.main",
                    "&:hover": { backgroundColor: "error.main" },
                }}
                onConfirmed={() => {
                    handleRemoveWarranty();
                    setOpenConfirmRemoveRepair(false);
                }}
            />
        </Box>
    );
};

export default WarrantyDetail;
