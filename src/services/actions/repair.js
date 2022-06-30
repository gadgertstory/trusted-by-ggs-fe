import {
    CREATE_REPAIR_SUCCESS,
    CREATE_REPAIR_FAIL,
    SET_MESSAGE,
} from "./types";

import postRepair from "../../middleware/repair";

export const createRepair = (data) => (dispatch) => {
  console.log('crEATE REPAIR',data)
    return postRepair.createRepair(data).then(
        (data) => {
            dispatch({
                type: CREATE_REPAIR_SUCCESS,
                payload: { data: data },
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: CREATE_REPAIR_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};
