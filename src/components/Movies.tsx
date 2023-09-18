import { HStack, Table, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Movie } from "../services/fakeMovieService";
import { Genre } from "../services/fakeGenreService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/Like";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";
import { useState } from "react";
import ListGroup from "./common/ListGroup";
import _ from "lodash";
import { FaSortUp } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Movies {
  movies: Movie[];
  onDeleteMovie: (movie: Movie) => void;
  onClickLike: (movie: Movie) => void;
}

interface SortColumn {
  path: string;
  order: string;
}

const Movies = ({ movies, onDeleteMovie, onClickLike }: Movies) => {
  const allGenres = [{ name: "All Genres", _id: "" }, ...getGenres()];
  const [selectedGenre, setSelectedGenre] = useState<Genre>();
  const [genres, setGenres] = useState<Genre[]>(allGenres);
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<SortColumn>({
    path: "title",
    order: "asc" || "desc",
  });
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleSortOnClick = (path: string) => {
    setSortColumn({ path, order: "asc" });
  };

  const filteredMovies =
    selectedGenre && selectedGenre._id
      ? movies.filter((m) => m.genre._id === selectedGenre._id)
      : movies;
  const sorted = _.orderBy(
    filteredMovies,
    [sortColumn.path],
    ["asc" || "desc"]
  );
  const paginatedMovies = paginate(sorted, currentPage, pageSize);

  const renderSortIcon = (column: string) => {
    if (column !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <FaSortUp />;
  };

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
              <Th
                className="clickable"
                onClick={() => handleSortOnClick("title")}
                fontWeight="extrabold"
              >
                <HStack>
                  <Text>Title</Text>
                  {renderSortIcon("title")}
                </HStack>
              </Th>
              <Th
                className="clickable"
                onClick={() => handleSortOnClick("genre.name")}
                fontWeight="extrabold"
              >
                <HStack>
                  <Text>Genre</Text>
                  {renderSortIcon("genre.name")}
                </HStack>
              </Th>
              <Th
                className="clickable"
                onClick={() => handleSortOnClick("numberInStock")}
                fontWeight="extrabold"
              >
                <HStack>
                  <Text>Stock</Text>
                  {renderSortIcon("numberInStock")}
                </HStack>
              </Th>
              <Th
                className="clickable"
                onClick={() => handleSortOnClick("dailyRentalRate")}
                fontWeight="extrabold"
              >
                <HStack>
                  <Text>Rate</Text>
                  {renderSortIcon("dailyRentalRate")}
                </HStack>
              </Th>
              <Th />
              <Th />
            </Tr>
          </Thead>
          <tbody>
            {paginatedMovies.map((movie) => (
              <Tr fontWeight="semibold" key={movie._id}>
                <Td>
                  <Link
                    className="text-primary"
                    to={`/movies/${movie._id}`}
                  >
                    {movie.title}
                  </Link>
                </Td>
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
