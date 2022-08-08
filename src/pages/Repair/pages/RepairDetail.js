import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
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
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { MoreVert, Edit, Print, Delete, Feed } from "@mui/icons-material";

import CustomerDetail from "../components/CustomerDetail";
import ProductDetail from "../components/ProductDetail";

import { history } from "../../../helpers/history";
import { getAllBrand } from "../../../services/actions/brand";
import { getAllStatus } from "../../../services/actions/status";
import {
    createRepair,
    updateRepair,
    getRepair,
    deleteRepair,
    getRepairPDF,
} from "../../../services/actions/repair";

import Repair from "../../../middleware/repair";
import { convertISOtoGMT } from "../../../utils/ConvertDate";
import HistoryTableDetail from "../components/HistoryTableDetail";
import ConfirmDialog from "../../../components/Dialog/ConfirmDialog";
import PreviewPDF from "../../../utils/PreviewPDF";
import Logo from "../../../assets/Logo/GadgetStory_logo.png";
import ConvertBase64 from "../../../utils/ConvertBase64";

const options = [
    { name: "Edit", icon: <Edit /> },
    { name: "Print", icon: <Print /> },
    { name: "Delete", icon: <Delete /> },
];

const RepairDetail = (roleUser) => {
    const { handleSubmit, control, setValue, register } = useForm();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const { brandList = [] } = useSelector((state) => state.brand);
    const { statusList = [] } = useSelector((state) => state.status);
    const { dataRepairPDF } = useSelector((state) => state.repair);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [newData, setNewData] = useState({});

    //Dialog warning
    const [openConfirmRemoveRepair, setOpenConfirmRemoveRepair] =
        useState(false);

    //AddressForm state
    const [subdistrict, setSubDistrict] = useState("");
    const [district, setDistrict] = useState("");
    const [province, setProvince] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [fullAddress, setFullAddress] = useState({});

    //Date
    const [receivedDate, setReceivedDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [notifiedDate, setNotifiedDate] = useState("");

    //Dropdown
    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef(null);
    const [onEdit, setOnEdit] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const [dataUrl, setDataUrl] = useState();

    const fetch = useCallback(() => {
        Repair.fetchRepair(id).then((res) => {
            const dataRepair = res.data;
            if (dataRepair) {
                setSubDistrict(dataRepair.customer_subdistrict);
                setDistrict(dataRepair.customer_district);
                setProvince(dataRepair.customer_province);
                setZipcode(dataRepair.customer_zipcode);
                setFullAddress({
                    subdistrict,
                    district,
                    province,
                    zipcode,
                });
                setReceivedDate(convertISOtoGMT(dataRepair.received_date));
                setReturnDate(convertISOtoGMT(dataRepair.return_date));
                setNotifiedDate(convertISOtoGMT(dataRepair.notified_date));
                setValue(
                    "customer_firstname",
                    dataRepair.customer_firstname || ""
                );
                setValue(
                    "customer_lastname",
                    dataRepair.customer_lastname || ""
                );
                setValue("customer_tel", dataRepair.customer_tel || "");
                setValue(
                    "customer_house_no",
                    dataRepair.customer_house_no || ""
                );
                setValue("product_name", dataRepair.product_name || "");
                setValue(
                    "product_serial_no",
                    dataRepair.product_serial_no || ""
                );
                setValue(
                    "product_serial_no",
                    dataRepair.product_serial_no || ""
                );
                setValue("brand_id", dataRepair.brand.brand_id || "");
                setValue("remark", dataRepair.remark || "");
                setValue("description", dataRepair.description || "");
                setValue("product_price", dataRepair.product_price || "");
                setValue(
                    "status_id",
                    dataRepair.status[0].status.status_id || ""
                );
                setValue("receive_method", dataRepair.receive_method || "");
                if (dataRepair.waranty_status === true) {
                    setValue("waranty_status", (dataRepair.waranty_status = 0));
                } else {
                    setValue("waranty_status", (dataRepair.waranty_status = 1));
                }
            }
        });
    }, [district, province, setValue, subdistrict, zipcode, id]);

    useEffect(() => {
        dispatch(getAllBrand());
        dispatch(getAllStatus());
        ConvertBase64(Logo, function (dataUrl) {
            setDataUrl(dataUrl);
        });
        if (id !== "new") {
            dispatch(getRepair(id));
            dispatch(getRepairPDF(id));
            fetch();
        } else {
            setOnEdit(true);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setFullAddress({
            subdistrict,
            district,
            province,
            zipcode,
        });
        setNewData({
            received_date: receivedDate,
            return_date: returnDate,
            notified_date: notifiedDate,
            customer_subdistrict: subdistrict,
            customer_district: district,
            customer_province: province,
            customer_zipcode: zipcode,
            user_id: currentUser.data.user_id,
        });
    }, [
        subdistrict,
        district,
        province,
        zipcode,
        receivedDate,
        returnDate,
        notifiedDate,
        currentUser,
    ]);

    const onSubmit = (data) => {
        if (!subdistrict || !district || !province || !zipcode) {
            setError("กรุณากรอกข้อมูลให้ครบ");
            return;
        }
        if (!error) {
            setLoading(true);
        }

        if (id === "new") {
            const _data = Object.assign(data, newData);
            if (_data.waranty_status === 0) {
                return (
                    (_data.waranty_status = true), dispatch(createRepair(_data))
                );
            } else {
                return (
                    (_data.waranty_status = false),
                    dispatch(createRepair(_data))
                );
            }
        } else {
            const _data = Object.assign(data, newData);
            const _updateData = {
                data: {
                    customer_firstname: _data.customer_firstname,
                    customer_lastname: _data.customer_lastname,
                    customer_tel: _data.customer_tel,
                    customer_house_no: _data.customer_house_no,
                    customer_subdistrict: _data.customer_subdistrict,
                    customer_district: _data.customer_district,
                    customer_province: _data.customer_province,
                    customer_zipcode: _data.customer_zipcode,
                    brand_id: _data.brand_id,
                    product_name: _data.product_name,
                    description: _data.description,
                    return_date: _data.return_date,
                    remark: _data.remark,
                },
                status: {
                    status_id: _data.status_id,
                    user_id: _data.user_id,
                },
            };
            dispatch(updateRepair(id, _updateData));
        }
    };

    const onSelect = (fulladdress) => {
        const { subdistrict, district, province, zipcode } = fulladdress;

        setSubDistrict(subdistrict);
        setDistrict(district);
        setProvince(province);
        setZipcode(zipcode);
        setFullAddress(fullAddress);

        setError("");
    };

    const onSelectReceivedDate = (receivedDate) => {
        setReceivedDate(receivedDate?.toISOString().split("T")[0]);
        setError("");
    };

    const onSelectReturnDate = (returnDate) => {
        setReturnDate(returnDate?.toISOString().split("T")[0]);
        setError("");
    };

    const onSelectNotifiedDate = (notifiedDate) => {
        setNotifiedDate(notifiedDate?.toISOString().split("T")[0]);
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

    const handleMenuItemClick = (event, index, option) => {
        if (option.name === "Edit") {
            setOnEdit(true);
            setSelectedIndex(index);
        } else if (option.name === "Delete") {
            setOpenConfirmRemoveRepair(true);
        } else {
            PreviewPDF(dataRepairPDF, dataUrl);
        }
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const handleRemoveRepair = () => {
        dispatch(deleteRepair(id));
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
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid>
                        <Grid
                            container
                            flexDirection="row"
                            alignItems={"center"}
                            // spacing={2}
                            sx={{
                                p: 2,
                            }}
                        >
                            <Feed fontSize="large" />
                            <Typography variant="h4" component="h2">
                                รับซ่อม
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
                                    onClick={handleToggle}
                                >
                                    <MoreVert />
                                </Button>
                            </ButtonGroup>
                            <Popper
                                open={open}
                                anchorEl={anchorRef.current}
                                role={undefined}
                                transition
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
                                                                key={
                                                                    option.name
                                                                }
                                                                selected={
                                                                    index ===
                                                                    selectedIndex
                                                                }
                                                                onClick={(
                                                                    event
                                                                ) =>
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
                                                                    {
                                                                        option.icon
                                                                    }
                                                                    {
                                                                        option.name
                                                                    }
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
                        <Skeleton variant="text" height={30} width={150} />
                        <Skeleton
                            variant="rectangular"
                            width={"100%"}
                            height={300}
                        />
                        <Skeleton variant="text" height={30} width={150} />
                        <Skeleton
                            variant="rectangular"
                            width={"100%"}
                            height={300}
                        />
                        <Skeleton variant="text" height={30} width={150} />
                        <Skeleton
                            variant="rectangular"
                            width={"100%"}
                            height={300}
                        />
                    </Stack>
                ) : (
                    <>
                        <CustomerDetail
                            roleUser={roleUser}
                            onEdit={onEdit}
                            register={register}
                            setSubDistrict={setSubDistrict}
                            setDistrict={setDistrict}
                            setProvince={setProvince}
                            setZipcode={setZipcode}
                            subdistrict={subdistrict}
                            zipcode={zipcode}
                            district={district}
                            province={province}
                            onError={onError}
                            control={control}
                            error={error}
                            setError={setError}
                            onSelect={onSelect}
                        />
                        <ProductDetail
                            roleUser={roleUser}
                            id={id}
                            onEdit={onEdit}
                            onError={onError}
                            control={control}
                            error={error}
                            setError={setError}
                            onSelectReturnDate={onSelectReturnDate}
                            onSelectReceivedDate={onSelectReceivedDate}
                            onSelectNotifiedDate={onSelectNotifiedDate}
                            brandList={brandList}
                            statusList={statusList}
                            receivedDate={receivedDate}
                            setReceivedDate={setReceivedDate}
                            returnDate={returnDate}
                            setReturnDate={setReturnDate}
                            notifiedDate={notifiedDate}
                            setNotifiedDate={setNotifiedDate}
                        />
                        {id === "new" ? (
                            ""
                        ) : (
                            <HistoryTableDetail dataRepair={dataRepairPDF} />
                        )}
                    </>
                )}
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
                            history.push("/repair");
                            window.location.reload();
                        }}
                    >
                        Cancel
                    </Button>
                    {onEdit ? (
                        <LoadingButton
                            sx={{ my: 2 }}
                            variant="contained"
                            color="primary"
                            type="submit"
                            loading={loading}
                        >
                            Submit
                        </LoadingButton>
                    ) : (
                        ""
                    )}
                </Stack>
                <ConfirmDialog
                    open={openConfirmRemoveRepair}
                    onClose={() => setOpenConfirmRemoveRepair(false)}
                    title={`ยืนยันการลบข้อมูล!`}
                    description={`ลบข้อมูลฟอร์มรับซ่อม`}
                    buttonConfirmText={"ยืนยันการลบ"}
                    buttonConfirmStyle={{
                        backgroundColor: "error.main",
                        "&:hover": { backgroundColor: "error.main" },
                    }}
                    onConfirmed={() => {
                        handleRemoveRepair();
                        setOpenConfirmRemoveRepair(false);
                    }}
                />
            </Box>
        </>
    );
};

export default RepairDetail;
