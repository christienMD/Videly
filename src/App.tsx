import { useState } from "react";
import ColorModeSwitch from "./components/ColorModeSwitch";
import Movies from "./components/Movies";
import { getMovies } from "./services/fakeMovieService";
import { Movie } from "./services/fakeMovieService";
export const tableHeaders = ["Title", "Genre", "Stock", "Rate", " "] as const;

function App() {
  const Allmovies = getMovies();
  const [movies, setMovies] = useState<Movie[]>(Allmovies);

  const handleDelete = (movie: Movie) => {
    const filteredMovies = movies.filter((mo) => mo._id !== movie._id);
    setMovies(filteredMovies);
  };

  // const handleLike = (movie: Movie) => {
  //    const movies = [...movies];
  // };

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

export default App;
