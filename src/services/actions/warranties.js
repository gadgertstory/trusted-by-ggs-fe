import {
    SET_MESSAGE,
    REQUEST_WARRANTY_SEARCH_SUCCESS,
    REQUEST_WARRANTY_SEARCH_FAIL,
} from "./types";

import Warranty from "../../middleware/warranty";
import actionHandler from "../../middleware/action_handler";

export const warrantyRequestSearch = (search) => async (dispatch) => {
    // Calling the server
    await Warranty.warrantyRequestSearch(search)
        .then((response) => {
            return response.data;
        })

        .then((responseJson) => {
            dispatch({
                type: REQUEST_WARRANTY_SEARCH_SUCCESS,
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
                type: REQUEST_WARRANTY_SEARCH_FAIL,
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
