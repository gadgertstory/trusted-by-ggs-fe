import {
    FETCH_ALL_ROLE_SUCCESS,
    FETCH_ALL_ROLE_FAIL,
} from "../actions/types";

const INITIAL_STATE = {
    dataAllRoles: [],
    isLoading: false,
};

const role = (state = INITIAL_STATE, action) => { 
    switch (action.type) {
        case FETCH_ALL_ROLE_SUCCESS:
            return {
                dataAllRoles: action.payload,
                isLoading: true,
            };
        case FETCH_ALL_ROLE_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default role;
