import {
    CREATE_WARRANTY_SUCCESS,
    CREATE_WARRANTY_FAIL,
    FETCH_WARRANTY_SUCCESS,
    FETCH_WARRANTY_FAIL,
    UPDATE_WARRANTY_SUCCESS,
    UPDATE_WARRANTY_FAIL,
    SET_MESSAGE,
    DELETE_WARRANTY_SUCCESS,
    DELETE_WARRANTY_FAIL,
} from "./types";

import Warranty from "../../middleware/warranty";
import actionHandler from "../../middleware/action_handler";
import { history } from "../../helpers/history";

export const createWarranty = (data) => async (dispatch) => {
    await Warranty.createWarranty(data)
        .then((data) => {
            dispatch({
                type: CREATE_WARRANTY_SUCCESS,
                payload: { data: data },
            });
            return (
                Promise.resolve(),
                actionHandler({
                    successMessage: "สร้างข้อมูลการรับประกันสำเร็จ",
                }),
                history.push("/warranty?serial_number="),
                setTimeout(function () {
                    window.location.reload();
                }, 1000 * 1.5)
            );
        })
        .catch((error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: CREATE_WARRANTY_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return (
                Promise.reject(),
                actionHandler({
                    error: message,
                })
            );
        });
};

export const updateWarranty = (id, dataUpdate) => async (dispatch) => {
    await Warranty.updateWarranty(id, dataUpdate)
        .then((id, data) => {
            dispatch({
                type: UPDATE_WARRANTY_SUCCESS,
                payload: { id, data: data },
            });
            return (
                Promise.resolve(),
                actionHandler({
                    successMessage: "บันทึกข้อมูลการรับประกันสำเร็จ",
                }),
                setTimeout(function () {
                    window.location.reload();
                }, 1000 * 1.5)
            );
        })
        .catch((error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: UPDATE_WARRANTY_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return (
                Promise.reject(),
                actionHandler({
                    error: message,
                })
            );
        });
};

export const deleteWarranty = (id) => async (dispatch) => {
    await Warranty.deleteWarranty(id)
        .then((response) => {
            return response.data;
        })

        .then((responseJson) => {
            dispatch({
                type: DELETE_WARRANTY_SUCCESS,
                payload: responseJson,
            });
            return (
                Promise.resolve(),
                actionHandler({
                    successMessage: "ลบข้อมูลการรับประกันสำเร็จ",
                }),
                history.push("/warranty?serial_number="),
                setTimeout(function () {
                    window.location.reload();
                }, 1000 * 1.5)
            );
        })
        .catch((error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: DELETE_WARRANTY_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return (
                Promise.reject(),
                actionHandler({
                    error: message,
                })
            );
        });
};

export const getWarrantyBySerialNumber = (serialNumber) => async (dispatch) => {
    await Warranty.getWarrantyBySerialNumber(serialNumber)
        .then((response) => {
            return response.data;
        })

        .then((responseJson) => {
            dispatch({
                type: FETCH_WARRANTY_SUCCESS,
                payload: responseJson,
            });
            return responseJson;
        })
        .catch((error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: FETCH_WARRANTY_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return (
                Promise.reject(),
                actionHandler({
                    error: message,
                })
            );
        });
};
