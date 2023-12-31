import { useEffect, useState } from "react";
import genreService, { Genre } from "../services/genre-service";
import axios from "axios";

const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([] as Genre[]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const allGenres = [{ _id: "", name: "All Genres" }, ...genres];

  useEffect(() => {
    setLoading(true);
    const { request, cancle } = genreService.getAllGenres();
    request
      .then((res) => {
        // console.log(res.data)
        setGenres(res.data);
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

  return { genres, allGenres, error, isLoading };
};

export default useGenres;
