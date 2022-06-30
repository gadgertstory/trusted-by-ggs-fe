import { CREATE_REPAIR_SUCCESS, CREATE_REPAIR_FAIL } from "../actions/types";

const initialState = {};

const repair = (state = initialState, action) => {
    const { type, payload } = action;
    console.log('payloaddddddddddd',payload)
    switch (type) {
        case CREATE_REPAIR_SUCCESS:
            return {
                ...state,
                data: payload.data,
            };
        case CREATE_REPAIR_FAIL:
            return {
                ...state,
                data: null,
            };
        default:
            return state;
    }
};

export default repair;
