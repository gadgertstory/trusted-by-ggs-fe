import axios from "axios";
import authHeader from "./authHeader";

const API_URL = process.env.REACT_APP_BASE_URL || "";

const fetchAllRepair = () => {
    return axios.get(`${API_URL}/repair-request`, { headers: authHeader() });
};

const requestRepairSearch = (body) => {
    return axios.post(`${API_URL}/repair-request-search`, body, {
        headers: authHeader(),
    });
};

const createRepair = (data) => {
    return axios
        .post(`${API_URL}/repair-request`, data, { headers: authHeader() })
        .then((response) => {
            return response.data;
        });
};

const updateRepair = (id, data) => {
    return axios
        .patch(`${API_URL}/repair-request/${id}`, data, {
            headers: authHeader(),
        })
        .then((response) => {
            return response.data;
        });
};

const fetchRepair = (id) => {
    return axios.get(`${API_URL}/repair-request/find/${id}`, {
        headers: authHeader(),
    });
};

const fetchRepairPDF = (id) => {
    return axios.get(`${API_URL}/repair-pdf/${id}`, {
        headers: authHeader(),
    });
};

const deleteRepair = (id) => {
    return axios.delete(`${API_URL}/repair-request/${id}`, {
        headers: authHeader(),
    });
};

const fetchRepairPDFForCustomer = (id) => {
    return axios.get(`${API_URL}/repair-pdf/detail/${id}`);
};

const exportedFunction = {
    createRepair,
    updateRepair,
    fetchAllRepair,
    fetchRepair,
    deleteRepair,
    requestRepairSearch,
    fetchRepairPDF,
    fetchRepairPDFForCustomer
};

export default exportedFunction;
