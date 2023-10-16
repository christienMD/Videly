import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useState } from "react";
import { Movie } from "../services/movie-service";
import useGenres from "../hooks/useGenres";
import useMovie from "../hooks/useMovie";
import updateMovies from "../hooks/useUpdateMovie";
import saveMovies from "../hooks/saveMovie";
import { Box, Button, Heading, Input, Select } from "@chakra-ui/react";

const MovieForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const movieId = `${params.id}`;
  const { genres } = useGenres();
  const { movie, setMovie } = useMovie(movieId);
  const [userCreatedMovie, setUserCreatedMovie] = useState<Movie>({} as Movie);

  const handleSubmitt = async (event: FormEvent) => {
    event.preventDefault();
    if (movieId === "new" && userCreatedMovie) {
      await saveMovies(userCreatedMovie);
      navigate("/");
    }
    if (movie && movieId !== "new") {
      await updateMovies(movie);
      navigate("/");
    }
  };

  return (
    <Box padding={5}>
      <Heading as="h1" fontSize="5xl">
        Movie Form
      </Heading>
      <form onSubmit={handleSubmitt}>
        <div className="form-group mt-3">
          <label htmlFor="title">Title</label>
          <Input
            onChange={(event) => {
              if (movie) setMovie({ ...movie, title: event.target.value });
              setUserCreatedMovie({
                ...userCreatedMovie,
                title: event.target.value,
              });
            }}
            value={movie.title}
            id="title"
            type="text"
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="genre">Genre</label>
          <Select
            placeholder="Select Genre"
            variant="filled"
            onChange={(event) => {
              if (movie) setMovie({ ...movie, _id: event.target.value });

              setUserCreatedMovie({
                ...userCreatedMovie,
                genreId: event.target.value,
              });
            }}
            id="genre"
          >
            {genres.map((genre) => (
              <option key={genre._id} value={genre._id}>
                {genre.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="form-group mt-3">
          <label htmlFor="numberInStock">Number in Stock</label>
          <Input
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
            value={movie.numberInStock}
            id="numberInStock"
            type="number"
            required
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="rate">Rate</label>

          <Input
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
            value={movie.dailyRentalRate}
            id="rate"
            type="number"
          />
        </div>
        <Button type="submit" colorScheme="messenger" marginTop={5}>
          submit
        </Button>
      </form>
    </Box>
  );
};

export default MovieForm;
