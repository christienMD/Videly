import movieService from "../services/movie-service";
import { FetchMovieResponse } from "../services/movieServies";

const updateMovies = async (movie: FetchMovieResponse) => {
  await movieService.updateMovie(movie);
};

export default updateMovies;
