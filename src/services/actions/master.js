import {
    FETCH_BRAND_REQUEST,
    FETCH_BRAND_SUCCESS,
    FETCH_BRAND_ERROR,
} from "./types";

import fetchMaster from "../../middleware/master";

export const getAllBrand = () => async (dispatch) => {
    // console.log("[*** 2. inside addLastNameActionCreator]");
    // Case1: Think returns Loading until receives response
    dispatch({ type: FETCH_BRAND_REQUEST });
    // Calling the server
    await fetchMaster
        .fetchAllBrand()
        .then((response) => response.data)
        .then((responseJson) => {
            // console.log("3. received ", responseJson);
            dispatch({
                type: FETCH_BRAND_SUCCESS,
                payload: responseJson,
            });
        })
        .catch((error) =>
            dispatch({ type: FETCH_BRAND_ERROR, error: error.message })
        );
};
