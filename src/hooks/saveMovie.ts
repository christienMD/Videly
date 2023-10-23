import movieService from "../services/movie-service";
import { Movie } from "../services/movie-service";

const saveMovies = async (movie: Movie) => {
  await movieService.saveMovie(movie);
};

export default saveMovies;
