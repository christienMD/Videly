import { useEffect, useState } from "react";
import { FetchMovieResponse } from "../services/movieServies";
import movieService from "../services/movie-service";
import axios from "axios";

const useMovies = () => {
  const [movies, setMovies] = useState<FetchMovieResponse[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const { request, cancle } = movieService.getAllMovies();

    request
      .then((res) => {
        console.log(res.data);
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
