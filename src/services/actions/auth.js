import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
} from "../constants/actionTypes";

import { fetchLogin } from "../../middleware/auth";

// const register = (username, email, password) => (dispatch) => {
//     return AuthService.register(username, email, password).then(
//         (response) => {
//             dispatch({
//                 type: REGISTER_SUCCESS,
//             });

//             dispatch({
//                 type: SET_MESSAGE,
//                 payload: response.data.message,
//             });

//             return Promise.resolve();
//         },
//         (error) => {
//             const message =
//                 (error.response &&
//                     error.response.data &&
//                     error.response.data.message) ||
//                 error.message ||
//                 error.toString();

//             dispatch({
//                 type: REGISTER_FAIL,
//             });

//             dispatch({
//                 type: SET_MESSAGE,
//                 payload: message,
//             });

//             return Promise.reject();
//         }
//     );
// };

const login = (userLogin) => (dispatch) => {
     console.log('🥹Action🥹',userLogin)
    return fetchLogin(userLogin).then(
        (data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: data },
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
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

const logout = () => (dispatch) => {
    // AuthService.logout();

    dispatch({
        type: LOGOUT,
    });
};

export { login, logout };
