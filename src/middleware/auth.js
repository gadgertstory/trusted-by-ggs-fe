import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const fetchLogin = (userLogin) => {
    console.log('FetchLogin🌝',userLogin)
    return axios.post(`${API_URL}signin"`,{userLogin}).then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem("user");
};

const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
    });
};

export { fetchLogin, logout, register };
