import { Genre } from "./genre-service";
import apiClient from "./api-client";

export function getGenres() {
  return apiClient.get<Genre[]>("/genres");
}
