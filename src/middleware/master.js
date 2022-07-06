import axios from "axios";
import authHeader from "./authHeader";

const API_URL = process.env.REACT_APP_BASE_URL || ''

const fetchAllBrand = () => {
  return axios.get(API_URL + "/brand",{ headers: authHeader() });
};

const exportedFunction = {
    fetchAllBrand,
};

export default exportedFunction;