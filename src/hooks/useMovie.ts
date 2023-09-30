import { useEffect, useState } from "react";
import { FetchMovieResponse } from "../services/movieServies";
import movieService from "../services/movie-service";

const useMovie = (movieId: string) => {
  const [movie, setMovie] = useState<FetchMovieResponse>();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (movieId === "new") return;
    movieService
      .getMovie(movieId)
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [movieId]);

  return { movie, setMovie, error, isLoading };
};

export default useMovie;
