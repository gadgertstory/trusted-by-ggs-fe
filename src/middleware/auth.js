import axios from "axios";
import authHeader from "./authHeader";

const API_URL = process.env.REACT_APP_BASE_URL

const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
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

const exportedFunction = {
    register,
    login,
    logout,
    forgotPassword
};

export default exportedFunction;
