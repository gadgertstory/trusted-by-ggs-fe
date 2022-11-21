import {
    SET_MESSAGE,
    REQUEST_REPAIR_SEARCH_SUCCESS,
    REQUEST_REPAIR_SEARCH_FAIL,
} from "./types";

import Repair from "../../middleware/repair";
import actionHandler from "../../middleware/action_handler";

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
