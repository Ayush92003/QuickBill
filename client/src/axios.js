import axios from "axios";

const API = axios.create({
  baseURL: "https://quickbill-62sw.onrender.com/api",
  withCredentials: true,
});

export default API;
