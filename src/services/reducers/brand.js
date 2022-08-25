import {
    FETCH_BRAND_SUCCESS,
    FETCH_BRAND_FAIL,
} from "../actions/types";

const INITIAL_STATE = {
    brandList: [],
    isLoading: false,
};

const brand = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_BRAND_SUCCESS:
            return {
                brandList: action.payload,
                isLoading: true,
            };
        case FETCH_BRAND_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default brand;
