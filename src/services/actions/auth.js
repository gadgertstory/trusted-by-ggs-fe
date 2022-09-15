import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
} from "./types";

import AuthService from "../../middleware/auth";
import actionHandler from "../../middleware/action_handler";
import { history } from "../../helpers/history";

export const login = (loginUser) => (dispatch) => {
    return AuthService.login(loginUser).then(
        (data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: data },
            });

            return (
                history.push("/"), window.location.reload(), Promise.resolve()
            );
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return (
                Promise.reject(),
                actionHandler(
                    message === "Unauthorized"
                        ? {
                              error: "กรุณากรอก Email และ Password ให้ถูกต้อง",
                          }
                        : message
                )
            );
        }
    );
};

export const logout = () => (dispatch) => {
    AuthService.logout();

    dispatch({
        type: LOGOUT,
    });
};
