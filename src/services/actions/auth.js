import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
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


export const forgotPassword = (user_email) => async (dispatch) => {
    await AuthService.forgotPassword(user_email)
        .then((user_email) => {
            dispatch({
                type: RESET_PASSWORD_SUCCESS,
                payload: { user_email: user_email },
            });
            return (
                Promise.resolve(),
                actionHandler({
                    successMessage: "รีเซ็ตพาสเวิร์ดสำเร็จ กรุณาตรวจสอบ Email ของท่าน"
                }),
                setTimeout(function () {
                    history.push('/login')
                    window.location.reload();
                }, 1000 * 2)
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
                type: RESET_PASSWORD_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return (
                Promise.reject(),
                actionHandler(
                    message === "Invalid email."
                        ? {
                              error: `ไม่มี Email ของท่านอยู่ในระบบ 
                              กรุณาตรวจสอบ Email ที่ท่านกรอก`,
                          }
                        : message
                )
            );
        });
};