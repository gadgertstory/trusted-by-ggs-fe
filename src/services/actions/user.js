import {
    FETCH_USER_SUCCESS,
    FETCH_USER_FAIL,
    SET_MESSAGE,
    UPDATE_ROLE_SUCCESS,
    UPDATE_ROLE_FAIL,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
} from "./types";

import User from "../../middleware/user";
import actionHandler from "../../middleware/action_handler";
import { history } from "../../helpers/history";

export const getUser = (id) => async (dispatch) => {
    await User.getUser(id)
        .then((response) => response.data)
        .then((responseJson) => {
            dispatch({
                type: FETCH_USER_SUCCESS,
                payload: responseJson,
            });
        })
        .catch((error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: FETCH_USER_FAIL,
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

export const updateUser = (id, role_name) => async (dispatch) => {
    await User.updateUser(id, role_name)
        .then((role_name) => {
            dispatch({
                type: UPDATE_ROLE_SUCCESS,
                payload: { role_name: role_name },
            });
            return (
                Promise.resolve(),
                actionHandler({
                    successMessage: "บันทึกข้อมูลสิทธิ์ผู้ใช้งานสำเร็จ",
                }),
                history.push("/manage-permission"),
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
                type: UPDATE_ROLE_FAIL,
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

export const deleteUser = (id) => async (dispatch) => {
    await User.deleteUser(id)
        .then((response) => {
            return response.data;
        })

        .then((responseJson) => {
            dispatch({
                type: DELETE_USER_SUCCESS,
                payload: responseJson,
            });
            return (
                Promise.resolve(),
                actionHandler({
                    successMessage: "ลบข้อมูลผู้ใช้สำเร็จ",
                }),
                history.push("/manage-permission"),
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
                type: DELETE_USER_FAIL,
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
