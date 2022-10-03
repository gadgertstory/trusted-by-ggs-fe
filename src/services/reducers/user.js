import {
    FETCH_ALL_USER_SUCCESS,
    FETCH_ALL_USER_FAIL,
} from "../actions/types";

const INITIAL_STATE = {
    dataAllUsers: [],
    isLoading: false,
};

const user = (state = INITIAL_STATE, action) => { 
    switch (action.type) {
        case FETCH_ALL_USER_SUCCESS:
            return {
                dataAllUsers: action.payload,
                isLoading: true,
            };
        case FETCH_ALL_USER_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default user;
