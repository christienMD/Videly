import http from "./httpService";
import { apiUrl } from "../config.json";

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

const apiEndPoint = apiUrl + "/movies";

export function getMovie(movieId: string) {
  return http.get<FetchMovieResponse>(apiEndPoint + "/" + movieId);
}

export function getMovies() {
  return http.get<FetchMovieResponse[]>(apiEndPoint);
}

export function updateMovie(movie: FetchMovieResponse) {
  if (movie._id) {
    const body = { ...movie };
    const updatedMovie = {
      title: body.title,
      genreId: body.genre._id,
      numberInStock: body.numberInStock,
      dailyRentalRate: body.dailyRentalRate,
    };

    return http.put(apiEndPoint + "/" + movie._id, updatedMovie);
  }
}

export function saveMovie(movie: Movie) {
  return http.post(apiEndPoint, movie);
}

export function deleteMovie(movieId: string) {
  return http.delete(apiEndPoint + "/" + movieId);
}
