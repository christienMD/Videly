import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { getGenres } from "../services/fakeGenreService";
// import { Movie, saveMovie } from "../services/fakeMovieService";

const genreNames = ["Action", "Comedy", "Thriller"] as const;

const schema = z.object({
  title: z
    .string()
    .min(5, { message: "Title should be at least 5 characters." }),
  numberInStock: z
    .number({
      invalid_type_error: "number in stock is required",
    })
    .min(0)
    .max(100),
  dailyRentalRate: z
    .number({ invalid_type_error: "rate is required" })
    .min(0)
    .max(10),
  genre: z.enum(genreNames),

});

type FormData = z.infer<typeof schema>;

const MovieForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const genres = getGenres();
  const movieId = useParams();

  console.log(movieId);



  return (
    <>
      <h1>Movie Form</h1>
      <form
        onSubmit={handleSubmit((data) => {
          // saveMovie(data);
          console.log(data)
        })}
      >
        <div className="form-group mt-3">
          <label htmlFor="title">Title</label>
          <input
            {...register("title")}
            id="title"
            type="text"
            className="form-control"
          />
          {errors.title && (
            <p className="text-danger">{errors.title.message}</p>
          )}
        </div>

        <div className="form-group mt-3">
          <label htmlFor="genre">Genre</label>
          <select {...register("genre")} id="genre" className="form-select">
            <option value="" />
            {genres.map((genre) => (
              <option key={genre._id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
          {errors.genre && (
            <div className="alert alert-danger">{errors.genre.message}</div>
          )}
        </div>

        <div className="form-group mt-3">
          <label htmlFor="numberInStock">Number in Stock</label>
          <input
            {...register("numberInStock", { valueAsNumber: true })}
            id="numberInStock"
            type="number"
            className="form-control"
          />
          {errors.numberInStock && (
            <p className="text-danger">{errors.numberInStock.message}</p>
          )}
        </div>
        <div className="form-group mt-3">
          <label htmlFor="rate">Rate</label>
          <input
            {...register("dailyRentalRate", { valueAsNumber: true })}
            id="rate"
            type="text"
            className="form-control"
          />
          {errors.dailyRentalRate && (
            <p className="text-danger">{errors.dailyRentalRate.message}</p>
          )}
        </div>
        <button type="submit" className="mt-3 btn btn-primary">
          submit
        </button>
      </form>
    </>
  );
};

export default MovieForm;
