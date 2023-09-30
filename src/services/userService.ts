import http from "./httpService";
import { apiUrl } from "../config.json";

export interface User {
  username: string;
  password: string;
  name: string;
}

const apiEndPoint = apiUrl + "/users";

export const register = (user: User) =>{
 return http.post(apiEndPoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
