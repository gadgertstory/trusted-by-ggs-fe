import {
    CREATE_REPAIR_SUCCESS,
    CREATE_REPAIR_FAIL,
    UPDATE_REPAIR_SUCCESS,
    UPDATE_REPAIR_FAIL,
    DELETE_REPAIR_SUCCESS,
    DELETE_REPAIR_FAIL,
    FETCH_REPAIR_PDF_SUCCESS,
    FETCH_REPAIR_PDF_FAIL,
} from "../actions/types";

const initialState = {
    data: {},
    dataRepairPDF: {},
    isLoading: false,
};

const repair = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_REPAIR_SUCCESS:
            return {
                ...state,
                isLoading: true,
            };
        case CREATE_REPAIR_FAIL:
            return {
                ...state,
                data: null,
                isLoading: false,
            };
        case UPDATE_REPAIR_SUCCESS:
            return {
                ...state,
                isLoading: true,
            };
        case UPDATE_REPAIR_FAIL:
            return {
                ...state,
                data: null,
                isLoading: false,
            };
        case DELETE_REPAIR_SUCCESS:
            return {
                ...state,
                isLoading: true,
            };
        case DELETE_REPAIR_FAIL:
            return {
                ...state,
                data: null,
                isLoading: false,
            };
        case FETCH_REPAIR_PDF_SUCCESS:
            return {
                ...state,
                dataRepairPDF: action.payload,
                isLoading: true,
            };
        case FETCH_REPAIR_PDF_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default repair;
