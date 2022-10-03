import {
    FETCH_ALL_ROLE_SUCCESS,
    FETCH_ALL_ROLE_FAIL,
    SET_MESSAGE
} from "./types";

import fetchMaster from "../../middleware/master";
import actionHandler from "../../middleware/action_handler";

export const getAllRoles = () => async (dispatch) => {
    await fetchMaster.getAllRoles()
        .then((response) => response.data)
        .then((responseJson) => { 
            dispatch({
                type: FETCH_ALL_ROLE_SUCCESS,
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
                type: FETCH_ALL_ROLE_FAIL,
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
