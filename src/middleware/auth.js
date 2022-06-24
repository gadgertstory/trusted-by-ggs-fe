import axios from "axios";

//==========================================
// const API_URL = "http://192.168.1.107:8080/auth";
// ======================================================
// const API_URL = "http://192.168.1.107:8080/auth"; prod

const API_URL =
    process.env.NODE_ENV !== "production" && process.env.REACT_ENV !== 'production'
        ? `${process.env.REACT_APP_BASE_URL}`
        : `${process.env.REACT_APP_BASE_URL}`;

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

const exportedFunction = {
    register,
    login,
    logout,
};

export default exportedFunction;
