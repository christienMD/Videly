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
  let filteredMovies = movies;
  if (searchQuery) {
    filteredMovies = movies.filter((m) =>
      m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  } else if (selectedGenre && selectedGenre._id) {
    filteredMovies = movies.filter((m) => m.genre._id === selectedGenre._id);
  }
  const sorted = _.orderBy(
    filteredMovies,
    [sortColumn.path],
    ["asc" || "desc"]
  );

  return { sorted, filteredMovies };
};

export default sortMovies;
