import { useEffect, useState } from "react";
// import { FetchMovieResponse } from "../services/movie-service";
import movieService from "../services/movie-service";
import axios from "axios";

const useData = <T>() => {
  const [data, setData] = useState<T[]>([] || {} as T[]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const { request, cancle } = movieService.getAll<T>();

    request
      .then((res) => {
        setData(res.data);
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

  return { data, setData, error, isLoading };
};

export default useData;
