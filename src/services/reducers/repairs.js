import {
    FETCH_ALL_REPAIR_SUCCESS,
    FETCH_ALL_REPAIR_FAIL,
    REQUEST_REPAIR_SEARCH_SUCCESS,
    REQUEST_REPAIR_SEARCH_FAIL,
    REQUEST_REPAIR_EXPORT_SUCCESS,
    REQUEST_REPAIR_EXPORT_FAIL,
} from "../actions/types";

const initialState = {
    dataAllRepair: [],
    dataSearchRepair: [],
    isLoading: false,
    dataExportRepair: []
};

const repairs = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_REPAIR_SUCCESS:
            return {
                dataAllRepair: action.payload,
                isLoading: true,
            };
        case FETCH_ALL_REPAIR_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        case REQUEST_REPAIR_SEARCH_SUCCESS:
            return {
                dataAllRepair: action.payload,
                isLoading: true,
            };
        case REQUEST_REPAIR_SEARCH_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        case REQUEST_REPAIR_EXPORT_SUCCESS:
            return {
                dataExportRepair: action.payload,
                isLoading: true,
            };
        case REQUEST_REPAIR_EXPORT_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default repairs;
