import {
    SET_MESSAGE,
    FETCH_ALL_REPAIR_REQUEST,
    FETCH_ALL_REPAIR_SUCCESS,
    FETCH_ALL_REPAIR_ERROR,
} from "./types";

import Repair from "../../middleware/repair";

export const getAllRepair = () => async (dispatch) => {
    console.log("GET[REPAIR]");
    // Case1: Think returns Loading until receives response
    dispatch({ type: FETCH_ALL_REPAIR_REQUEST });
    // Calling the server
    await Repair.fetchAllRepair()
        .then((response) => response.data)
        .then((responseJson) => {
            // console.log("3. received [REPAIR]", responseJson);
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
                type: FETCH_ALL_REPAIR_ERROR,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        });
};