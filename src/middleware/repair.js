import axios from "axios";
import authHeader from "./authHeader";

const API_URL = process.env.REACT_APP_BASE_URL || "";

const createRepair = (data) => {
    return axios
        .post(`${API_URL}/repair-request`, data, { headers: authHeader() })
        .then((response) => {
            return response.data;
        });
};
const exportedFunction = {
    createRepair,
};

export default exportedFunction;
