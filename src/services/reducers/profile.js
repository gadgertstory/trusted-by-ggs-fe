import {
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAIL,
} from "../actions/types";

const initialState = {
    profile: {},
    isLoading: false,
};

const profile = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.payload,
                isLoading: true,
            };
        case FETCH_PROFILE_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default profile;
