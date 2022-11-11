import axios from "axios";
import authHeader from "./authHeader";

const API_URL = process.env.REACT_APP_WARRANTY_API || "";

const warrantyRequestSearch = (search) => {
    return axios.get(`${API_URL}/warranty${search}`);
};

// const WarrantyRequestExport = (value) => {
//     return axios.get(`${API_URL}/repair-request/export${value}`, { headers: authHeader() });
// };

const createWarranty = (data) => {
    return axios
        .post(`${API_URL}/warranty`, data, { headers: authHeader() })
        .then((response) => {
            return response.data;
        });
};

const updateWarranty = (id, data) => {
    return axios
        .patch(`${API_URL}/warranty/${id}`, data, {
            headers: authHeader(),
        })
        .then((response) => {
            return response.data;
        });
};

const deleteWarranty = (id) => {
    return axios.delete(`${API_URL}/warranty/${id}`, {
        headers: authHeader(),
    });
};

const getWarrantyById = (serialNumber) => {
    return axios.get(`${API_URL}/warranty/${serialNumber}`, {
        headers: authHeader(),
    });
};

const exportedFunction = {
    createWarranty,
    updateWarranty,
    deleteWarranty,
    getWarrantyById,
    warrantyRequestSearch,
    // WarrantyRequestExport
};

export default exportedFunction;
