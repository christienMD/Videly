import http from "./httpService";
import { apiUrl } from "../config.json";
import { Genre } from "./genre-service";


export function getGenres() {
  return http.get<Genre[]>(apiUrl + "/genres");
}
