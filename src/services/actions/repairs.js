import {
    SET_MESSAGE,
    FETCH_ALL_REPAIR_SUCCESS,
    FETCH_ALL_REPAIR_FAIL,
    REQUEST_REPAIR_SEARCH_SUCCESS,
    REQUEST_REPAIR_SEARCH_FAIL,
    REQUEST_REPAIR_EXPORT_SUCCESS,
    REQUEST_REPAIR_EXPORT_FAIL,
} from "./types";

import Repair from "../../middleware/repair";
import actionHandler from "../../middleware/action_handler";

export const getAllRepair = () => async (dispatch) => {
    await Repair.fetchAllRepair()
        .then((response) => response.data)
        .then((responseJson) => {
            dispatch({
                type: FETCH_ALL_REPAIR_SUCCESS,
                payload: responseJson,
            });
        })
        .catch((error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: FETCH_ALL_REPAIR_FAIL,
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

export const RepairRequestSearch = (search) => async (dispatch) => {
    // Calling the server
    await Repair.RepairRequestSearch(search)
        .then((response) => {
            return response.data;
        })

        .then((responseJson) => {
            dispatch({
                type: REQUEST_REPAIR_SEARCH_SUCCESS,
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
                type: REQUEST_REPAIR_SEARCH_FAIL,
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


export const RepairRequestExport = (value) => async (dispatch) => {
    // Calling the server 
    await Repair.RepairRequestExport(value)
        .then((response) => {
            return response.data;
        })

        .then((responseJson) => {
            dispatch({
                type: REQUEST_REPAIR_EXPORT_SUCCESS,
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
                type: REQUEST_REPAIR_EXPORT_FAIL,
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