import axios from "axios";
import authHeader from "./authHeader";

const API_URL = process.env.REACT_APP_BASE_URL || ''

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

const getProfile = () => {
  return axios.get(`${API_URL}/auth/profile`,{ headers: authHeader() });
};

const updateProfile = (profile) => {
  return axios
        .patch(`${API_URL}/users/update`, profile, {
            headers: authHeader(),
        })
        .then((response) => {
            return response.data;
        });
};

const getAllUsers = () => {
  return axios.get(API_URL + "/users", { headers: authHeader() });
};

const getUser = (user_id) => {
  return axios.get(API_URL + `/users/profile/${user_id}`, { headers: authHeader() });
};

const updateRoleUser = (user_id,role_name) => {
  return axios.patch(API_URL + `/users/${user_id}`,role_name, { headers: authHeader() });
};

const exportedFunction = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  updateProfile,
  getProfile,
  getAllUsers,
  getUser,
  updateRoleUser
};

export default exportedFunction;