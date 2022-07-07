import axios from "axios";
import authHeader from "./authHeader";

const API_URL = process.env.REACT_APP_BASE_URL || "";

const fetchAllRepair = () => {
    return axios.get(`${API_URL}/repair-request`, { headers: authHeader() });
};

const createRepair = (data) => {
    return axios
        .post(`${API_URL}/repair-request`, data, { headers: authHeader() })
        .then((response) => {
            return response.data;
        });
};

const updateRepair = (id,data) => {
    return axios
        .patch(`${API_URL}/repair-request/${id}`, data, { headers: authHeader() })
        .then((response) => {
            return response.data;
        });
};

const fetchRepair = (body) => {
    return axios.get(`${API_URL}/repair-request/find/${body}`, {
        headers: authHeader(),
    });
};

const fetchAllRepairHistory = () => {
    return axios.get(`${API_URL}/repair-history`, { headers: authHeader() });
};

const exportedFunction = {
    createRepair,
    updateRepair,
    fetchAllRepair,
    fetchRepair,
    fetchAllRepairHistory
};

export default exportedFunction;
