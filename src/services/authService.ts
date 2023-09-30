import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/auth";

http.setJwt(getJwt())

export function login(email: string, password: string) {
  return http.post(apiEndPoint, { email, password });
}

export function getJwt() {
  return localStorage.getItem("token");
}

export default {
  login,
  getJwt,
};
