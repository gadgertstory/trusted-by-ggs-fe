import axios from "axios";

const API_URL = "https://app-hlcys.stagin-1ulf1.trial-62qxuv.wpcp-demo.run/";

const fetchLogin = (userLogin) => {
    return axios
        .post(`${API_URL}`, {
            userLogin,
        })
        .then((response) => {
            if (response.data.accessToken) {
                console.log('tttttttt',response);
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        }).catch(e => {
            console.log(e);
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
