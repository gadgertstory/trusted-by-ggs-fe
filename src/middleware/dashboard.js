import axios from "axios";
import authHeader from "./authHeader";

const API_URL = process.env.REACT_APP_BASE_URL || ''

const fetchDashboard = () => {
  return axios.get(`${API_URL}/dashboard`,{ headers: authHeader() });
};

const exportedFunction = {
    fetchDashboard,
};

export default exportedFunction;