import {
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAIL,
    SET_MESSAGE,
} from "./types";

import Profile from "../../middleware/user";
import actionHandler from "../../middleware/action_handler";

export const getProfile = () => async (dispatch) => {
    // Calling the server
    await Profile.getProfile()
        .then((response) => {
            return response.data;
        })

        .then((responseJson) => {
            dispatch({
                type: FETCH_PROFILE_SUCCESS,
                payload: responseJson,
            });
            return responseJson;
        })
        .catch((error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: FETCH_PROFILE_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return (
                Promise.reject(),
                actionHandler({
                    error: message,
                })
            );
        });
};

export const updateProfile = (profile) => async (dispatch) => {
    await Profile.updateProfile(profile)
        .then((profile) => {
            dispatch({
                type: UPDATE_PROFILE_SUCCESS,
                payload: { profile: profile },
            });
            return (
                Promise.resolve(),
                actionHandler({
                    successMessage: "Update Profile Success",
                }),
                setTimeout(function () {
                    window.location.reload();
                }, 1000 * 1.5)
            );
        })
        .catch((error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: UPDATE_PROFILE_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return (
                Promise.reject(),
                actionHandler({
                    error: message,
                })
            );
        });
};
