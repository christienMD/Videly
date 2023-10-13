import axios from "axios";

const token = localStorage.getItem("token");

export default axios.create({
  baseURL: "http://localhost:3900/api",
  headers: {
    "x-auth-token": token,
  },
});
