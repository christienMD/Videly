import { useEffect, useState } from "react";
import { FetchMovieResponse } from "../services/movie-service";
import movieService from "../services/movie-service";
import axios from "axios";

const useMovies = () => {
  const [movies, setMovies] = useState<FetchMovieResponse[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const { request, cancle } = movieService.getAll<FetchMovieResponse>();

    request
      .then((res) => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          return;
        }
        setError(err.message);
        setLoading(false);
      });

    return () => cancle();
  }, []);

  return { movies, setMovies, error, isLoading };
};

export default useMovies;
