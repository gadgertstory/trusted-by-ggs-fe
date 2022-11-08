import {
    REQUEST_WARRANTY_SEARCH_SUCCESS,
    REQUEST_WARRANTY_SEARCH_FAIL,
} from "../actions/types";

const initialState = {
    dataAllWarranty: [],
    isLoading: false,
};

const warranties = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_WARRANTY_SEARCH_SUCCESS:
            return {
                dataAllWarranty: action.payload,
                isLoading: true,
            };
        case REQUEST_WARRANTY_SEARCH_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default warranties;
