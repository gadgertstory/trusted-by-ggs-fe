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
} from "@mui/material";
import FeedIcon from "@mui/icons-material/Feed";

import CustomerDetail from "../components/CustomerDetail";
import ProductDetail from "../components/ProductDetail";

import { history } from "../../../helpers/history";
import { getAllBrand } from "../../../services/actions/master";
import { createRepair } from "../../../services/actions/repair";

const RepairDetail = () => {
    const { handleSubmit, control } = useForm();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const { brandList = [] } = useSelector((state) => state.master);
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

    useEffect(() => {
        dispatch(getAllBrand());
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
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item>
                        <FeedIcon fontSize="large" />
                    </Grid>
                    <Grid item>
                        <h2>รับซ่อม</h2>
                    </Grid>
                </Grid>
                <CustomerDetail
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
