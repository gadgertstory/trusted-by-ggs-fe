import {
    FETCH_BRAND_SUCCESS,
    FETCH_BRAND_FAIL,
} from "./types";

import fetchMaster from "../../middleware/master";

export const getAllBrand = () => async (dispatch) => {
    // Calling the server
    await fetchMaster
        .fetchAllBrand()
        .then((response) => response.data)
        .then((responseJson) => {
            dispatch({
                type: FETCH_BRAND_SUCCESS,
                payload: responseJson,
            });
        })
        .catch((error) =>
            dispatch({ type: FETCH_BRAND_FAIL, error: error.message })
        );
};

