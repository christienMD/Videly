import movieService from "../services/movie-service";
import { FetchMovieResponse } from "../services/movie-service";

const updateMovies = async (movie: FetchMovieResponse) => {
  await movieService.update(movie);
};

export default updateMovies;
