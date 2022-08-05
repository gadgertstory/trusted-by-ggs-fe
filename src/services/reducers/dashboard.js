import {
    FETCH_DASHBOARD_REQUEST,
    FETCH_DASHBOARD_SUCCESS,
    FETCH_DASHBOARD_FAIL,
} from "../actions/types";

const INITIAL_STATE = {
    countRepair: {},
    isLoading: false,
};

const dashboard = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_DASHBOARD_REQUEST:
            return FETCH_DASHBOARD_REQUEST;
        case FETCH_DASHBOARD_SUCCESS:
            return {
                countRepair: action.payload,
                isLoading: true,
            };
        case FETCH_DASHBOARD_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return { ...state };
    }
};

export default dashboard;
