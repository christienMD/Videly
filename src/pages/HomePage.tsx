import { useState } from "react";
import ColorModeSwitch from "../components/ColorModeSwitch";
import Movies from "../components/Movies";
import { getMovies, Movie } from "../services/fakeMovieService";

function HomePage() {
  const Allmovies = getMovies();
  const [movies, setMovies] = useState<Movie[]>(Allmovies);

  const handleDelete = (movie: Movie) => {
    const filteredMovies = movies.filter((mo) => mo._id !== movie._id);
    setMovies(filteredMovies);
  };

  return (
    <div>
      <ColorModeSwitch />

      <Movies
        movies={movies}
        onDeleteMovie={handleDelete}
        onClickLike={(movie) => {
          const index = movies.indexOf(movie);
          const likedMovie = movies[index];
          console.log(likedMovie);
        }}
      />
    </div>
  );
}

export default HomePage;
