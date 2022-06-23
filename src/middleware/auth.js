import axios from "axios";

// const API_URL = "http://192.168.1.41:31585/auth"; kube
//==========================================
const API_URL = "http://192.168.1.107:8080/auth";

const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
    });
};

const login = (loginUser) => {
    return axios.post(`${API_URL}/login`, loginUser).then((response) => {
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

export default {
    register,
    login,
    logout,
};
