import apiClient from "./api-client";

export interface User {
  username: string;
  password: string;
  name: string;
}

export const register = (user: User) => {
  return apiClient.post("/users", {
    email: user.username,
    password: user.password,
    name: user.name,
  });
};
