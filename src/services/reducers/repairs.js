import {
    FETCH_ALL_REPAIR_REQUEST,
    FETCH_ALL_REPAIR_SUCCESS,
    FETCH_ALL_REPAIR_ERROR,
    REQUEST_REPAIR_SEARCH_SUCCESS,
    REQUEST_REPAIR_SEARCH_ERROR
} from "../actions/types";

const initialState = {
    dataAllRepair: [],
    dataSearchRepair:[],
    isLoading: false,
};

const repair = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_REPAIR_REQUEST:
            return {
                ...state,
                isLoading: false,
            };
        case FETCH_ALL_REPAIR_SUCCESS:
            return {
                dataAllRepair: action.payload,
                isLoading: true,
            };
        case FETCH_ALL_REPAIR_ERROR:
            return {
                ...state,
                isLoading: false,
            };
            case REQUEST_REPAIR_SEARCH_SUCCESS:
            return {
                dataAllRepair: action.payload,
                isLoading: true,
            };
        case REQUEST_REPAIR_SEARCH_ERROR:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default repair;
