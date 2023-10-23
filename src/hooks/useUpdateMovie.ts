import movieService from "../services/movie-service";
import { FetchMovieResponse } from "../services/movie-service";

const updateMovies = async (movie: FetchMovieResponse) => {
  await movieService.updateMovie(movie);
};

export default updateMovies;
