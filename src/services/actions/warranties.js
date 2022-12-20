import {
    SET_MESSAGE,
    REQUEST_WARRANTY_SEARCH_BY_ADMIN_SUCCESS,
    REQUEST_WARRANTY_SEARCH_BY_ADMIN_FAIL,
    REQUEST_WARRANTY_SEARCH_BY_USER_SUCCESS,
    REQUEST_WARRANTY_SEARCH_BY_USER_FAIL,
} from "./types";

import Warranty from "../../middleware/warranty";
import actionHandler from "../../middleware/action_handler";

export const warrantyRequestSearchByAdmin = (search) => async (dispatch) => {
    // Calling the server
    await Warranty.warrantyRequestSearchByAdmin(search)
        .then((response) => {
            return response.data;
        })

        .then((responseJson) => {
            dispatch({
                type: REQUEST_WARRANTY_SEARCH_BY_ADMIN_SUCCESS,
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
                type: REQUEST_WARRANTY_SEARCH_BY_ADMIN_FAIL,
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

export const warrantyRequestSearchByUser = (search) => async (dispatch) => {
    // Calling the server
    await Warranty.warrantyRequestSearchByUser(search)
        .then((response) => {
            return response.data;
        })

        .then((responseJson) => {
            dispatch({
                type: REQUEST_WARRANTY_SEARCH_BY_USER_SUCCESS,
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
                type: REQUEST_WARRANTY_SEARCH_BY_USER_FAIL,
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
