import _ from "lodash";
import { Genre } from "../services/genre-service";
import { FetchMovieResponse } from "../services/movie-service";

export interface SortColumn {
  path: string;
  order: string;
}

const sortMovies = (
  searchQuery: string,
  selectedGenre: Genre | null,
  movies: FetchMovieResponse[],
  sortColumn: SortColumn
) => {
  let filteredMovies = [...movies];
  if (searchQuery) {
    filteredMovies = filteredMovies.filter((m) =>
      m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  }
  if (selectedGenre && selectedGenre._id) {
    // Debugging statements
    console.log("Selected Genre ID:", selectedGenre._id);
    console.log("Movies before genre filter:", filteredMovies);
    filteredMovies = filteredMovies.filter(
      (m) => m.genre._id === selectedGenre._id
    );
    // filteredMovies = filteredMovies.filter((m) => {
    //   const match = m.genre._id === selectedGenre._id;
    //   console.log(`Movie Title: ${m.title}, Match: ${match}`);
    //   return match;
    // });

    // Debugging statement
    console.log("Movies after genre filter:", filteredMovies);
  }

  const sorted = _.orderBy(
    filteredMovies,
    [sortColumn.path],
    ["asc" || "desc"]
  );

  return { sorted, filteredMovies };
};

export default sortMovies;
