import {
    FETCH_BRAND_REQUEST,
    FETCH_BRAND_SUCCESS,
    FETCH_BRAND_ERROR,
} from "../actions/types";

const INITIAL_STATE = {
    brandList: [],
    isLoading: false
};

const master = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_BRAND_REQUEST:
            // console.log("4. [FETCH_BRAND_REQUEST MASTER]", action);
            return FETCH_BRAND_REQUEST;
        case FETCH_BRAND_SUCCESS:
            // console.log("5. [MASTER]", action.payload);
            return {
                brandList: action.payload,
            };
        case FETCH_BRAND_ERROR:
            return false
        default:
            return state;
    }
};

export default master