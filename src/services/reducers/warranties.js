import {
    REQUEST_WARRANTY_SEARCH_BY_ADMIN_SUCCESS,
    REQUEST_WARRANTY_SEARCH_BY_ADMIN_FAIL,
    REQUEST_WARRANTY_SEARCH_BY_USER_SUCCESS,
    REQUEST_WARRANTY_SEARCH_BY_USER_FAIL,
} from "../actions/types";

const initialState = {
    dataAllWarrantyByAdmin: [],
    dataAllWarrantyByUser: [],
    isLoading: false,
};

const warranties = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_WARRANTY_SEARCH_BY_ADMIN_SUCCESS:
            return {
                dataAllWarrantyByAdmin: action.payload,
                isLoading: true,
            };
        case REQUEST_WARRANTY_SEARCH_BY_ADMIN_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        case REQUEST_WARRANTY_SEARCH_BY_USER_SUCCESS:
            return {
                dataAllWarrantyByUser: action.payload,
                isLoading: true,
            };
        case REQUEST_WARRANTY_SEARCH_BY_USER_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default warranties;
