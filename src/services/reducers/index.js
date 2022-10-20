import { combineReducers } from "redux";
import auth from "./auth";
import master from "./brand";
import repairs from "./repairs";
import repair from "./repair";
import brand from "./brand";
import status from "./status";
import dashboard from "./dashboard";
import profile from "./profile";
import user from "./user";
import users from "./users";
import roles from "./roles";

import message from "./message";

export default combineReducers({
    auth,
    message,
    master,
    repairs,
    repair,
    brand,
    status,
    dashboard,
    profile,
    user,
    users,
    roles,
});
