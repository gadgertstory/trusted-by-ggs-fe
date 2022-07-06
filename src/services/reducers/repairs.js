import {
    FETCH_ALL_REPAIR_REQUEST,
    FETCH_ALL_REPAIR_SUCCESS,
    FETCH_ALL_REPAIR_ERROR,
} from "../actions/types";

const initialState = {
    dataAllRepair: [],
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
        default:
            return state;
    }
};

export default repair;
