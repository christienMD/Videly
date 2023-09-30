import { AxiosRequestConfig } from "axios";
import apiClient from "./api-client";

export interface Genre {
  _id: string;
  name: string;
}

class GenreService {
  getAllGenres() {
    const controller = new AbortController();
    const request = apiClient.get<Genre[]>("/genres", {
      signal: controller.signal,
    } as AxiosRequestConfig);
    return { request, cancle: () => controller.abort() };
  }
}

export default new GenreService();
