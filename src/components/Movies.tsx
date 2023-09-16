import { Table, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Movie } from "../services/fakeMovieService";
import { Genre } from "../services/fakeGenreService";
import { getGenres } from "../services/fakeGenreService";
import { tableHeaders } from "../App";
import Like from "./common/Like";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";
import { useState } from "react";
import ListGroup from "./common/ListGroup";

interface Movies {
  movies: Movie[];
  onDeleteMovie: (movie: Movie) => void;
  onClickLike: (movie: Movie) => void;
}

const Movies = ({ movies, onDeleteMovie, onClickLike }: Movies) => {
  const allGenres = [{ name: "All Genres", id: "" }, ...getGenres()];
  const [selectedGenre, setSelectedGenre] = useState<Genre>();
  const [genres, setGenres] = useState<Genre[]>(allGenres);
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredMovies =
    selectedGenre && selectedGenre._id
      ? movies.filter((m) => m.genre._id === selectedGenre._id)
      : movies;
  const paginatedMovies = paginate(filteredMovies, currentPage, pageSize);

  return (
    <div className="row">
      <div className="col-md-3">
        <ListGroup
          genres={genres}
          onSelectGenre={(genre) => {
            setSelectedGenre(genre);
            setCurrentPage(1);
          }}
        />
      </div>
      <div className="col">
        {filteredMovies.length > 0 ? (
          <Text>Showing {filteredMovies.length} movies in the database.</Text>
        ) : (
          <Text>There are no movies in the database</Text>
        )}
        <Table>
          <Thead>
            <Tr>
              {tableHeaders.map((tableHeader) => (
                <Th key={tableHeader} fontWeight="extrabold">
                  {tableHeader}
                </Th>
              ))}
            </Tr>
          </Thead>
          <tbody>
            {paginatedMovies.map((movie) => (
              <Tr fontWeight="semibold" key={movie._id}>
                <Td>{movie.title}</Td>
                <Td>{movie.genre.name}</Td>
                <Td>{movie.numberInStock}</Td>
                <Td>{movie.dailyRentalRate}</Td>
                <Td>
                  <Like onClick={() => onClickLike(movie)}></Like>
                </Td>
                <Td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => onDeleteMovie}
                  >
                    Delete
                  </button>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
        <Pagination
          currentPage={currentPage}
          itemsCount={filteredMovies.length}
          pageSize={pageSize}
          onPageChange={(page) => handlePageChange(page)}
        />
      </div>
    </div>
  );
};

export default Movies;
