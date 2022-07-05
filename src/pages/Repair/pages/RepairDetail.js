import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
    Button,
    Stack,
    Box,
    FormHelperText,
    FormControl,
    Grid,
    InputLabel,
} from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import FeedIcon from "@mui/icons-material/Feed";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import CustomerDetail from "../components/CustomerDetail";
import ProductDetail from "../components/ProductDetail";

import { history } from "../../../helpers/history";
import { getAllBrand } from "../../../services/actions/master";
import {
    createRepair,
    getRepair,
    updateRepair,
} from "../../../services/actions/repair";

import Repair from "../../../middleware/repair";
import { convertISOtoGMT } from "../../../utils/ConvertDate";

const options = ["Edit", "Print", "Delete"];

const RepairDetail = () => {
    const { handleSubmit, control, setValue, register } = useForm();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const { brandList = [] } = useSelector((state) => state.master);
    const { dataRepair } = useSelector((state) => state.repair);

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
    const [receivedDate, setReceivedDate] = React.useState("");
    const [returnDate, setReturnDate] = React.useState("");

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    useEffect(() => {
        dispatch(getAllBrand());

        dispatch(getRepair(id))
        console.log("test repair");
        // Repair.fetchRepair(id).then((res) => {
        //     const dataRepair = res.data;
        //     console.log(res.data);
        //     if (dataRepair) {
        //         setSubDistrict(dataRepair.customer_subdistrict);
        //         setDistrict(dataRepair.customer_district);
        //         setProvince(dataRepair.customer_province);
        //         setZipcode(dataRepair.customer_zipcode);
        //         setFullAddress({
        //             subdistrict,
        //             district,
        //             province,
        //             zipcode,
        //         });
        //         setReceivedDate(convertISOtoGMT(dataRepair.received_date));
        //         setReturnDate(convertISOtoGMT(dataRepair.return_date));
        //         setValue(
        //             "customer_firstname",
        //             dataRepair.customer_firstname || ""
        //         );
        //         setValue("customer_surname", dataRepair.customer_surname || "");
        //         setValue("customer_tel", dataRepair.customer_tel || "");
        //         setValue(
        //             "customer_house_no",
        //             dataRepair.customer_house_no || ""
        //         );
        //         setValue("product_name", dataRepair.product_name || "");
        //         setValue(
        //             "product_serial_no",
        //             dataRepair.product_serial_no || ""
        //         );
        //         setValue(
        //             "product_serial_no",
        //             dataRepair.product_serial_no || ""
        //         );
        //         setValue("brand_id", dataRepair.brand.brand_id || "");
        //         setValue("remark", dataRepair.remark || "");
        //         setValue(receivedDate || "");
        //         setValue(returnDate || "");
        //         setValue("product_price", dataRepair.product_price || "");
        //     }
        // });
    }, [dispatch, id]);

    useEffect(() => {
        if (id === "new") {
            setSubDistrict("");
            setDistrict("");
            setProvince("");
            setZipcode("");
            setFullAddress("");
        }
    }, [id]);

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
        console.log(_data);

        if (id === "new") {
            dispatch(createRepair(_data))
                .then(() => {
                    history.push("/repair");
                    window.location.reload();
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            dispatch(updateRepair(id, _data));
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
        console.log(receivedDate);
        setReceivedDate(receivedDate?.toISOString().split("T")[0]);
        setError("");
    };

    const onSelectReturnDate = (returnDate) => {
        console.log(returnDate);
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
        console.log("event", index);
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
                                <MoreVertIcon />
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
                                                            key={option}
                                                            // disabled={
                                                            //     index === 2
                                                            // }
                                                            selected={
                                                                index ===
                                                                selectedIndex
                                                            }
                                                            onClick={(event) =>
                                                                handleMenuItemClick(
                                                                    event,
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            {option}
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
                </Grid>

                <CustomerDetail
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

