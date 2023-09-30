import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useState } from "react";
import { Movie } from "../services/movieServies";
import useGenres from "../hooks/useGenres";
import useMovie from "../hooks/useMovie";
import updateMovies from "../hooks/useUpdateMovie";
import saveMovies from "../hooks/saveMovie";

const MovieForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const movieId = `${params.id}`;
  const { genres } = useGenres();
  const { movie, setMovie } = useMovie(movieId);
  const [userCreatedMovie, setUserCreatedMovie] = useState<Movie>({} as Movie);

  const handleSubmitt = async (event: FormEvent) => {
    event.preventDefault();
    if (movieId === "new" && userCreatedMovie) saveMovies(userCreatedMovie);
    if (movie && movieId !== "new") updateMovies(movie);
    navigate("/");
  };

  return (
    <>
      <h1>Movie Form</h1>
      <form onSubmit={handleSubmitt}>
        <div className="form-group mt-3">
          <label htmlFor="title">Title</label>
          <input
            onChange={(event) => {
              if (movie) setMovie({ ...movie, title: event.target.value });
              setUserCreatedMovie({
                ...userCreatedMovie,
                title: event.target.value,
              });
            }}
            value={movie?.title}
            id="title"
            type="text"
            className="form-control"
          />
          {/* {errors.title && (
            <p className="text-danger">{errors.title.message}</p>
          )} */}
        </div>

        <div className="form-group mt-3">
          <label htmlFor="genre">Genre</label>
          <select
            onChange={(event) => {
              if (movie) setMovie({ ...movie, _id: event.target.value });

              setUserCreatedMovie({
                ...userCreatedMovie,
                genreId: event.target.value,
              });
            }}
            value={movie?.genre.name}
            id="genre"
            className="form-select"
          >
            <option value="" />
            {genres.map((genre) => (
              <option key={genre._id} value={genre._id}>
                {genre.name}
              </option>
            ))}
          </select>
          {/* {errors.genre && (
            <div className="alert alert-danger">{errors.genre.message}</div>
          )} */}
        </div>

        <div className="form-group mt-3">
          <label htmlFor="numberInStock">Number in Stock</label>
          <input
            // ref={numberInStockRef}
            onChange={(event) => {
              if (movie)
                setMovie({
                  ...movie,
                  numberInStock: parseInt(event.target.value),
                });
              setUserCreatedMovie({
                ...userCreatedMovie,
                numberInStock: parseInt(event.target.value),
              });
            }}
            value={movie?.numberInStock}
            id="numberInStock"
            type="number"
            className="form-control"
          />
          {/* {errors.numberInStock && (
            <p className="text-danger">{errors.numberInStock.message}</p>
          )} */}
        </div>
        <div className="form-group mt-3">
          <label htmlFor="rate">Rate</label>
          <input
            // ref={dailyRentalRateRef}
            onChange={(event) => {
              if (movie)
                setMovie({
                  ...movie,
                  dailyRentalRate: parseFloat(event.target.value),
                });
              setUserCreatedMovie({
                ...userCreatedMovie,
                dailyRentalRate: parseFloat(event.target.value),
              });
            }}
            value={movie?.dailyRentalRate}
            id="rate"
            type="text"
            className="form-control"
          />
          {/* {errors.dailyRentalRate && (
            <p className="text-danger">{errors.dailyRentalRate.message}</p>
          )} */}
        </div>
        <button type="submit" className="mt-3 btn btn-primary">
          submit
        </button>
      </form>
    </>
  );
};

export default MovieForm;
