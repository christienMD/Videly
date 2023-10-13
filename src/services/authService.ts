import apiClient from "./api-client";

export function login(email: string, password: string) {
  return apiClient.post("/auth", { email, password });
}

export default {
  login,
};
