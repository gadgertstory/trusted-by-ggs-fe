import { FETCH_USER_SUCCESS, FETCH_USER_FAIL } from "../actions/types";

const INITIAL_STATE = {
    dataUser: [],
    isLoading: false,
};

const user = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_SUCCESS:
            return {
                dataUser: action.payload,
                isLoading: true,
            };
        case FETCH_USER_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default user;
