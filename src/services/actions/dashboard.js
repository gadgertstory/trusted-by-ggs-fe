import {
    FETCH_DASHBOARD_REQUEST,
    FETCH_DASHBOARD_SUCCESS,
    FETCH_DASHBOARD_FAIL,
    SET_MESSAGE
} from "./types";

import fetchDashboard from "../../middleware/dashboard";
import actionHandler from "../../middleware/action_handler";

export const getDashboard = () => async (dispatch) => {
    dispatch({ type: FETCH_DASHBOARD_REQUEST });
    // Calling the server
    await fetchDashboard.fetchDashboard()
        .then((response) => response.data)
        .then((responseJson) => {
            dispatch({
                type: FETCH_DASHBOARD_SUCCESS,
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
                type: FETCH_DASHBOARD_FAIL,
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
