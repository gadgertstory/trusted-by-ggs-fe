import { combineReducers } from "redux";
import auth from "./auth";
import master from "./master";

import message from "./message";

export default combineReducers({
  auth,
  message,
  master
});
