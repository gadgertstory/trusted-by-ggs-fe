import axios from "axios";
import authHeader from "./authHeader";

const API_URL = process.env.REACT_APP_BASE_URL2 || "";

const WarrantyRequestSearch = (search) => {
    return axios.get(`${API_URL}/warranty${search}`);
};

const WarrantyRequestExport = (value) => {
    return axios.get(`${API_URL}/repair-request/export${value}`, { headers: authHeader() });
};

const createWarranty = (data) => {
    return axios
        .post(`${API_URL}/repair-request`, data, { headers: authHeader() })
        .then((response) => {
            return response.data;
        });
};

const updateWarranty = (id, data) => {
    return axios
        .patch(`${API_URL}/repair-request/${id}`, data, {
            headers: authHeader(),
        })
        .then((response) => {
            return response.data;
        });
};

const deleteWarranty = (id) => {
    return axios.delete(`${API_URL}/repair-request/${id}`, {
        headers: authHeader(),
    });
};

const fetchWarranty = (id) => {
    return axios.get(`${API_URL}/repair-request/find/${id}`, {
        headers: authHeader(),
    });
};

const fetchWarrantyCustomer = (id) => {
    return axios.get(`${API_URL}/repair-pdf/detail/${id}`);
};

const exportedFunction = {
    createWarranty,
    updateWarranty,
    deleteWarranty,
    fetchWarranty,
    fetchWarrantyCustomer,
    WarrantyRequestSearch,
    WarrantyRequestExport
};

export default exportedFunction;
