import axios from "axios";
import authHeader from "./authHeader";

const API_URL = process.env.REACT_APP_BASE_URL || ''

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

const updateUser = (user_id,role_name) => {
  return axios.patch(API_URL + `/users/${user_id}`,role_name, { headers: authHeader() });
};

const deleteUser = (user_id) => {
  return axios.delete(API_URL + `/users/${user_id}`, { headers: authHeader() });
};

const exportedFunction = {
  updateProfile,
  getProfile,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
};

export default exportedFunction;