import {
    CREATE_REPAIR_SUCCESS,
    CREATE_REPAIR_FAIL,
    UPDATE_REPAIR_SUCCESS,
    UPDATE_REPAIR_FAIL,
    FETCH_REPAIR_REQUEST,
    FETCH_REPAIR_SUCCESS,
    FETCH_REPAIR_ERROR,
} from "../actions/types";

const initialState = {
    // data: {},
    dataRepair: {},
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
        case FETCH_REPAIR_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case FETCH_REPAIR_SUCCESS:
            return {
                ...state,
                dataRepair: action.payload,
                isLoading: true,
            };
        case FETCH_REPAIR_ERROR:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default repair;
