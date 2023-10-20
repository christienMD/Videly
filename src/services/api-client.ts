import axios from "axios";

const token = localStorage.getItem("token");
const apiUrl = import.meta.env.VITE_API_URL;

export default axios.create({
  baseURL: apiUrl,
  headers: {
    "x-auth-token": token,
  },
});
