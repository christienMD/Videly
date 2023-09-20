import { Genre } from "./fakeGenreService";
import http from "./httpService";
import { apiUrl } from "../config.json";

export function getGenres() {
  return http.get<Genre[]>(apiUrl + "/genres");
}
