import {
    CREATE_REPAIR_SUCCESS,
    CREATE_REPAIR_FAIL,
    UPDATE_REPAIR_SUCCESS,
    UPDATE_REPAIR_FAIL,
    SET_MESSAGE,
    DELETE_REPAIR_SUCCESS,
    DELETE_REPAIR_FAIL,
    FETCH_REPAIR_PDF_SUCCESS,
    FETCH_REPAIR_PDF_FAIL,
} from "./types";

import Repair from "../../middleware/repair";
import actionHandler from "../../middleware/action_handler";
import { history } from "../../helpers/history";

export const createRepair = (data) => async (dispatch) => {
   await Repair.createRepair(data)
        .then((data) => {
            dispatch({
                type: CREATE_REPAIR_SUCCESS,
                payload: { data: data },
            });
            return (
                Promise.resolve(),
                actionHandler({
                    successMessage: "Create Repair Success",
                }),
                history.push("/repair"),
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
                type: CREATE_REPAIR_FAIL,
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

export const updateRepair = (id, data,formData) => async (dispatch) => {
    await Repair.updateRepair(id, data,formData)
        .then((id, data) => {
            dispatch({
                type: UPDATE_REPAIR_SUCCESS,
                payload: { id, data: data },
            });
            return (
                Promise.resolve(),
                actionHandler({
                    successMessage: "Update Repair Success",
                }),
                // history.push("/repair"),
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
                type: UPDATE_REPAIR_FAIL,
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

export const deleteRepair = (id) => async (dispatch) => {
    await Repair.deleteRepair(id)
        .then((response) => {
            return response.data;
        })

        .then((responseJson) => {
            dispatch({
                type: DELETE_REPAIR_SUCCESS,
                payload: responseJson,
            });
            return (
                Promise.resolve(),
                actionHandler({
                    successMessage: "Delete Success",
                }),
                history.push("/repair"),
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
                type: DELETE_REPAIR_FAIL,
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

export const getRepairPDF = (id) => async (dispatch) => {
    // Calling the server
    await Repair.fetchRepairPDF(id)
        .then((response) => {
            return response.data;
        })

        .then((responseJson) => {
            dispatch({
                type: FETCH_REPAIR_PDF_SUCCESS,
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
                type: FETCH_REPAIR_PDF_FAIL,
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
