import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
    Button,
    Stack,
    Box,
    FormHelperText,
    FormControl,
    Grid,
    // InputLabel,
    Typography,
} from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import FeedIcon from "@mui/icons-material/Feed";
import { MoreVert, Edit, Print, Delete } from "@mui/icons-material";

import CustomerDetail from "../components/CustomerDetail";
import ProductDetail from "../components/ProductDetail";

import { history } from "../../../helpers/history";
import { getAllBrand } from "../../../services/actions/master";
import { createRepair, updateRepair } from "../../../services/actions/repair";

import Repair from "../../../middleware/repair";
import { convertISOtoGMT } from "../../../utils/ConvertDate";

const options = [
    { name: "Edit", icon: <Edit /> },
    { name: "Print", icon: <Print /> },
    { name: "Delete", icon: <Delete /> },
];

const RepairDetail = () => {
    const { handleSubmit, control, setValue, register } = useForm();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const { brandList = [] } = useSelector((state) => state.master);
    const { message } = useSelector((state) => state.message);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");
    const [newData, setNewData] = useState({});

    //AddressForm state
    const [subdistrict, setSubDistrict] = useState("");
    const [district, setDistrict] = useState("");
    const [province, setProvince] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [fullAddress, setFullAddress] = useState({});

    //Date
    const [receivedDate, setReceivedDate] = useState("");
    const [returnDate, setReturnDate] = useState("");

    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef(null);
    const [onEdit, setOnEdit] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        dispatch(getAllBrand());

        if (id === "new") {
            setOnEdit(true);
            setSubDistrict("");
            setDistrict("");
            setProvince("");
            setZipcode("");
            setFullAddress("");
        }

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
                // setValue(receivedDate || "");
                // setValue(returnDate || "");
                setValue("product_price", dataRepair.product_price || "");
            }
        });
    }, []);

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
            customer_subdistrict: subdistrict,
            customer_district: district,
            customer_province: province,
            customer_zipcode: zipcode,
            user_id: currentUser.data.user_id,
        });
    }, [subdistrict, district, province, zipcode, receivedDate, returnDate]);

    const onSubmit = (data) => {
        if (!subdistrict || !district || !province || !zipcode) {
            setError("กรุณากรอกข้อมูลให้ครบ");
            return;
        }

        const _data = Object.assign(data, newData);
        // console.log(id, _data);

        if (id === "new") {
            dispatch(createRepair(_data));
        } else {
            delete _data.user_id;
            dispatch(updateRepair(id, _data))
                .then(() => {
                    // console.log("dispatch", id, _data);
                    // history.push("/repair");
                    // window.location.reload();
                })
                .catch(() => {
                    setLoading(false);
                });
        }
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

    const onSelectReceivedDate = (receivedDate) => {
        setReceivedDate(receivedDate?.toISOString().split("T")[0]);
        setError("");
    };

    const onSelectReturnDate = (returnDate) => {
        setReturnDate(returnDate?.toISOString().split("T")[0]);
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

    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };

    const handleMenuItemClick = (event, index) => {
        if (index === 0) {
            setOnEdit(true);
        }
        setSelectedIndex(index);
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
                    spacing={2}
                >
                    <Grid item>
                        <Grid
                            container
                            flexDirection="row"
                            alignItems={"center"}
                            spacing={2}
                        >
                            <FeedIcon fontSize="large" />
                            <h2>รับซ่อม</h2>
                        </Grid>
                    </Grid>
                    {id === "new" ? (
                        ""
                    ) : (
                        <Grid item>
                            <ButtonGroup
                                variant="contained"
                                ref={anchorRef}
                                aria-label="split button"
                            >
                                {/* <Button onClick={handleClick}>{options[selectedIndex]}</Button> */}
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
                                                                // disabled={
                                                                //     index === 2
                                                                // }
                                                                selected={
                                                                    index ===
                                                                    selectedIndex
                                                                }
                                                                onClick={(
                                                                    event
                                                                ) =>
                                                                    handleMenuItemClick(
                                                                        event,
                                                                        index
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

                <CustomerDetail
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
                    id={id}
                    onEdit={onEdit}
                    onError={onError}
                    control={control}
                    error={error}
                    setError={setError}
                    onSelectReturnDate={onSelectReturnDate}
                    onSelectReceivedDate={onSelectReceivedDate}
                    brandList={brandList}
                    receivedDate={receivedDate}
                    setReceivedDate={setReceivedDate}
                    returnDate={returnDate}
                    setReturnDate={setReturnDate}
                />
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
