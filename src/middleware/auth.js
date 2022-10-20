import axios from "axios";
import authHeader from "./authHeader";

const API_URL = process.env.REACT_APP_BASE_URL;

const register = (registerUser) => {
    return axios
        .post(`${API_URL}/auth/register`, registerUser, {
            headers: authHeader(),
        })
        .then((response) => {
            return response.data;
        });
};

const login = (loginUser) => {
    return axios.post(`${API_URL}/auth/login`, loginUser).then((response) => {
        const accessToken = response.data.access_token;
        if (accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem("user");
};

const forgotPassword = (user_email) => {
    return axios
        .post(`${API_URL}/users/forgot`, user_email, {
            headers: authHeader(),
        })
        .then((response) => {
            return response.data;
        });
};

const resetPassword = (user_password, queryParams) => {
    return axios
        .post(
            `${API_URL}/users/reset?h=${queryParams.queryHashParams}&e=${queryParams.queryEmailParams}`,
            { user_password },
            {
                headers: authHeader(),
            }
        )
        .then((response) => {
            return response.data;
        });
};

const exportedFunction = {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
};

export default exportedFunction;
