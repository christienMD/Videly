import { AxiosRequestConfig } from "axios";
import apiClient from "./api-client";
// import create from "./http-service";

export interface FetchMovieResponse {
  _id: string;
  title: string;
  genre: {
    _id: string;
    name: string;
  };
  numberInStock: number;
  dailyRentalRate: number;
  publishDate?: string;
  liked?: boolean;
}
export interface Movie {
  title: string;
  genreId: string;
  numberInStock: number;
  dailyRentalRate: number;
  publishDate?: string;
  liked?: boolean;
}

class MovieService {
getMovie(movieId: string) {
  return apiClient.get("/movies/" + movieId);
}
getAllMovies() {
  const controller = new AbortController();
  const request = apiClient.get<FetchMovieResponse[]>("/movies", {
    signal: controller.signal,
  } as AxiosRequestConfig);
  return { request, cancle: () => controller.abort() };
}

deleteMovie(id: string) {
  return apiClient.delete("/movies/" + id);
}

saveMovie(movie: Movie) {
  return apiClient.post("/movies", movie);
}

updateMovie(movie: FetchMovieResponse) {
  if (movie._id) {
    const body = { ...movie };
    const updatedMovie = {
      title: body.title,
      genreId: body.genre._id,
      numberInStock: body.numberInStock,
      dailyRentalRate: body.dailyRentalRate,
    };

    return apiClient.put("/movies/" + movie._id, updatedMovie);
  }
}
}

export default new MovieService;
