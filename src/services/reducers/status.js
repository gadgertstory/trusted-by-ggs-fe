import {
    FETCH_STATUS_REQUEST,
    FETCH_STATUS_SUCCESS,
    FETCH_STATUS_FAIL,
} from "../actions/types";

const INITIAL_STATE = {
    statusList: [],
    isLoading: false,
};

const master = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_STATUS_REQUEST:
            return FETCH_STATUS_REQUEST;
        case FETCH_STATUS_SUCCESS:
            return {
                statusList: action.payload,
                isLoading: true,
            };
        case FETCH_STATUS_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default master;
