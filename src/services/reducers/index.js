import { combineReducers } from "redux";
import auth from "./auth";
import master from "./master";
import repairs from "./repairs";
import repair from "./repair";

import message from "./message";

export default combineReducers({
  auth,
  message,
  master,
  repairs,
  repair
});
