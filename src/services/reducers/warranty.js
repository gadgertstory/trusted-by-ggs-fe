import {
    CREATE_WARRANTY_SUCCESS,
    CREATE_WARRANTY_FAIL,
    UPDATE_WARRANTY_SUCCESS,
    UPDATE_WARRANTY_FAIL,
    DELETE_WARRANTY_SUCCESS,
    DELETE_WARRANTY_FAIL,
    FETCH_WARRANTY_SUCCESS,
    FETCH_WARRANTY_FAIL
} from "../actions/types";

const initialState = {
    data: {},
    dataWarranty: {},
    isLoading: false,
};

const Warranty = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_WARRANTY_SUCCESS:
            return {
                ...state,
                isLoading: true,
            };
        case CREATE_WARRANTY_FAIL:
            return {
                ...state,
                data: null,
                isLoading: false,
            };
        case UPDATE_WARRANTY_SUCCESS:
            return {
                ...state,
                isLoading: true,
            };
        case UPDATE_WARRANTY_FAIL:
            return {
                ...state,
                data: null,
                isLoading: false,
            };
        case DELETE_WARRANTY_SUCCESS:
            return {
                ...state,
                isLoading: true,
            };
        case DELETE_WARRANTY_FAIL:
            return {
                ...state,
                data: null,
                isLoading: false,
            };
        case FETCH_WARRANTY_SUCCESS:
            return {
                ...state,
                dataWarranty: action.payload,
                isLoading: true,
            };
        case FETCH_WARRANTY_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default Warranty;
