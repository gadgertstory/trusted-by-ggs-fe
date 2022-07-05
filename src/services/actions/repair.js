import {
    CREATE_REPAIR_SUCCESS,
    CREATE_REPAIR_FAIL,
    UPDATE_REPAIR_SUCCESS,
    UPDATE_REPAIR_FAIL,
    SET_MESSAGE,
    FETCH_REPAIR_REQUEST,
    FETCH_REPAIR_SUCCESS,
    FETCH_REPAIR_ERROR,
} from "./types";

import Repair from "../../middleware/repair";

export const createRepair = (data) => (dispatch) => {
    return Repair.createRepair(data)
        .then((data) => {
            dispatch({
                type: CREATE_REPAIR_SUCCESS,
                payload: { data: data },
            });

            return Promise.resolve();
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

            return Promise.reject();
        });
};

export const updateRepair = (id, data) => (dispatch) => {
    return Repair.updateRepair(data)
        .then((data) => {
            dispatch({
                type: CREATE_REPAIR_SUCCESS,
                payload: { data: id, data: data },
            });

            return Promise.resolve();
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

            return Promise.reject();
        });
};

export const getRepair = (id) => async (dispatch) => {
    // // Case1: Think returns Loading until receives response
    dispatch({ type: FETCH_REPAIR_REQUEST });

    // Calling the server
    await Repair.fetchRepair(id)
        .then((response) => {
            return response.data;
        })

        .then((responseJson) => {
            dispatch({
                type: FETCH_REPAIR_SUCCESS,
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
                type: FETCH_REPAIR_ERROR,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        });
};
