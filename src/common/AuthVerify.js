import React from "react";

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
};

const AuthVerify = (props) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        const decodedJwt = parseJwt(user.access_token);
        if (decodedJwt.exp * 1000 < Date.now()) {
            props.logOut();
        }
    }
    return <div></div>;
};

export default AuthVerify;
