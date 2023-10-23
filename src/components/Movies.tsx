import { Box, HStack, Table, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { FetchMovieResponse } from "../services/movie-service";
import movieService from "../services/movie-service";
import Like from "./Like";
import Pagination from "./Pagination";
import { paginate } from "../utils/paginate";
import { useState } from "react";
import GenreListGroup from "./GenreListGroup";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import { AxiosError } from "axios";
// import useGenres from "../hooks/useGenres";
import { Genre } from "../services/genre-service";
import SortIcon from "./SortIcon";
import sortMovies, { SortColumn } from "../utils/sortedMovies";
import useGetCurrentUser from "../hooks/useGetCurrentUser";
// import useMovies from "../hooks/useMovies";
// import useData from "../hooks/useData";
import MovieHeading from "./MovieHeading";
import useMovies from "../hooks/useMovies";

interface Movies {
  onDeleteMovie: (movie: FetchMovieResponse) => void;
  onClickLike: (movie: FetchMovieResponse) => void;
}

const Movies = () => {
  const { currentUser } = useGetCurrentUser();
  // const { movies, setMovies } = useMovies();
  // const { data: movies, setData: setMovies } = useData<FetchMovieResponse>();
  const { movies, setMovies } = useMovies();
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>({} as Genre);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const [sortColumn, setSortColumn] = useState<SortColumn>({
    path: "title",
    order: "asc" || "desc",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const { sorted, filteredMovies } = sortMovies(
    searchQuery,
    selectedGenre,
    movies,
    sortColumn
  );
  const paginatedMovies = paginate(sorted, currentPage, pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleSortOnClick = (path: string) => {
    setSortColumn({ path, order: "asc" });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedGenre(null);
    setCurrentPage(1);
  };

  const handleDelete = async (movie: FetchMovieResponse) => {
    const originalMovies = [...movies];
    const filterdDeletedmovie = originalMovies.filter(
      (mo) => mo._id !== movie._id
    );
    setMovies(filterdDeletedmovie);
    try {
      await movieService.deleteMovie(movie._id);
    } catch (ex) {
      if ((ex as AxiosError)?.response?.status === 400) {
        toast.error("This movie has already been deleted");
      }
      setMovies(originalMovies);
    }
  };

  // console.log("fil: ", filteredMovies);
  // if (movies && movies.length > 0) {
  //   console.log("Sample Movie: ", movies[0]);
  // }

  return (
    <div className="row">
      <div className="col-md-3">
        <GenreListGroup
          onSelectGenre={(genre) => {
            setSelectedGenre(genre);
            setCurrentPage(1);
          }}
        />
        {/* <> {console.log("sel: ", selectedGenre)}</> */}
      </div>
      <div className="col">
        {currentUser && (
          <Link
            to="movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20, marginTop: 10 }}
          >
            New Movie
          </Link>
        )}

        <MovieHeading filteredMovies={filteredMovies} />

        <SearchBox
          value={searchQuery}
          onChange={(value) => handleSearch(value)}
        />
        <Box overflowY="auto" whiteSpace="nowrap" width="100%">
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
                    <SortIcon column="title" sortColumn={sortColumn} />
                  </HStack>
                </Th>
                <Th
                  className="clickable"
                  onClick={() => handleSortOnClick("genre.name")}
                  fontWeight="extrabold"
                >
                  <HStack>
                    <Text>Genre</Text>
                    <SortIcon column="genre.name" sortColumn={sortColumn} />
                  </HStack>
                </Th>
                <Th
                  className="clickable"
                  onClick={() => handleSortOnClick("numberInStock")}
                  fontWeight="extrabold"
                >
                  <HStack>
                    <Text>Stock</Text>
                    <SortIcon column="numberInStock" sortColumn={sortColumn} />
                  </HStack>
                </Th>
                <Th
                  className="clickable"
                  onClick={() => handleSortOnClick("dailyRentalRate")}
                  fontWeight="extrabold"
                >
                  <HStack>
                    <Text>Rate</Text>
                    <SortIcon
                      column="dailyRentalRate"
                      sortColumn={sortColumn}
                    />
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
                    <Link className="text-primary" to={`/movies/${movie._id}`}>
                      {movie.title}
                    </Link>
                  </Td>
                  <Td>{movie.genre.name}</Td>
                  <Td>{movie.numberInStock}</Td>
                  <Td>{movie.dailyRentalRate}</Td>
                  <Td>
                    <Like />
                  </Td>
                  <Td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDelete(movie)}
                    >
                      Delete
                    </button>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </Box>
        <Box mt={5}>
          <Pagination
            currentPage={currentPage}
            itemsCount={filteredMovies.length}
            pageSize={pageSize}
            onPageChange={(page) => handlePageChange(page)}
          />
        </Box>
      </div>
    </div>
  );
};

export default Movies;
