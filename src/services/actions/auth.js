import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    SET_MESSAGE,
} from "./types";

import AuthService from "../../middleware/auth";
import actionHandler from "../../middleware/action_handler";
import { history } from "../../helpers/history";

export const registerUser = (registerUser) => async (dispatch) => {
    await AuthService.register(registerUser)
        .then((registerUser) => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: registerUser,
            });
            return (
                Promise.resolve(),
                actionHandler({
                    successMessage: "สร้างผู้ใช้งานสำเร็จ",
                }),
                setTimeout(function () {
                    history.push("/");
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

            const statusCode =
                (error.response &&
                    error.response.data &&
                    error.response.data.statusCode) ||
                error.message ||
                error.toString();

            dispatch({
                type: REGISTER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return (
                Promise.reject(),
                actionHandler(
                    statusCode === 409
                        ? {
                              error: "User Email ถูกใช้งานไปแล้ว",
                          }
                        : message
                )
            );
        });
};

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
            const statusCode =
                (error.response &&
                    error.response.data &&
                    error.response.data.statusCode) ||
                error.statusCode ||
                error.toString();

            dispatch({
                type: LOGIN_FAIL,
            });

            return (
                Promise.reject(),
                actionHandler(
                    statusCode > 399 && statusCode < 500
                        ? {
                              error: "กรุณากรอก Email และ Password ให้ถูกต้อง",
                          }
                        : {
                              error: "ไม่สามารถเชื่อมต่อ Server ได้",
                          }
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
                    successMessage:
                        "รีเซ็ตพาสเวิร์ดสำเร็จ กรุณาตรวจสอบ Email ของท่าน",
                }),
                setTimeout(function () {
                    history.push("/login");
                    window.location.reload();
                }, 1000 * 2)
            );
        })
        .catch((error) => {
            const statusCode =
                (error.response &&
                    error.response.data &&
                    error.response.data.statusCode) ||
                error.statusCode ||
                error.toString();

            dispatch({
                type: RESET_PASSWORD_FAIL,
            });

            return (
                Promise.reject(),
                actionHandler(
                    statusCode === 406
                        ? {
                              error: `ไม่มี Email ของท่านอยู่ในระบบ 
                              กรุณาตรวจสอบ Email ที่ท่านกรอก`,
                          }
                        : {
                              error: "ไม่สามารถเชื่อมต่อ Server ได้",
                          }
                )
            );
        });
};

export const resetPassword =
    (user_password, queryParams) => async (dispatch) => {
        await AuthService.resetPassword(user_password, queryParams)
            .then((user_password) => {
                dispatch({
                    type: RESET_PASSWORD_SUCCESS,
                    payload: { user_password: user_password },
                });
                return (
                    Promise.resolve(),
                    actionHandler({
                        successMessage: "รีเซ็ตพาสเวิร์ดสำเร็จ",
                    }),
                    setTimeout(function () {
                        history.push("/login");
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
                    actionHandler({
                        error: message,
                    })
                );
            });
    };
