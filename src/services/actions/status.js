import {
    FETCH_STATUS_REQUEST,
    FETCH_STATUS_SUCCESS,
    FETCH_STATUS_FAIL
} from "./types";

import fetchMaster from "../../middleware/master";

export const getAllStatus = () => async (dispatch) => {
    dispatch({ type: FETCH_STATUS_REQUEST });
    await fetchMaster
        .fetchAllStatus()
        .then((response) => response.data)
        .then((responseJson) => {
            dispatch({
                type: FETCH_STATUS_SUCCESS,
                payload: responseJson,
            });
        })
        .catch((error) =>
            dispatch({ type: FETCH_STATUS_FAIL, error: error.message })
        );
};

