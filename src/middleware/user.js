import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://192.168.1.107:8080/auth";

const getPublicContent = () => {
  return axios.get(API_URL + "/profile",{ headers: authHeader() });
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};


const exportedFunction = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

export default exportedFunction;