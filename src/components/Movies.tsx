import { HStack, Table, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Movie } from "../services/fakeMovieService";
import { deleteMovie, getMovies } from "../services/movieServies";
import { Genre } from "../services/fakeGenreService";
import { getGenres } from "../services/genreService";
import Like from "./common/Like";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";
import { useEffect, useState } from "react";
import ListGroup from "./common/ListGroup";
import _ from "lodash";
import { toast } from "react-toastify";
import { FaSortUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import { AxiosError } from "axios";

interface Movies {
  moviesAll: Movie[];
  onDeleteMovie: (movie: Movie) => void;
  onClickLike: (movie: Movie) => void;
}

interface SortColumn {
  path: string;
  order: string;
}

const Movies = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>();
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<SortColumn>({
    path: "title",
    order: "asc" || "desc",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const fetchGenres = async () => {
    try {
      const { data } = await getGenres();
      return data;
    } catch (error) {
      console.error("Error fetching genres:", error);
      return [];
    }
  };
  const fetchMovies = async () => {
    try {
      const { data } = await getMovies();
      // console.log(data)
      return data;
    } catch (error) {
      console.error("Error fetching genres:", error);
      return [];
    }
  };
  //  fetchMovies()
  const fetchData = async () => {
    try {
      const genres = await fetchGenres();
      const allGenres = [{ name: "All Genres", _id: "" }, ...genres];
      setGenres(allGenres);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchMovieData = async () => {
    try {
      const allMovies = await fetchMovies();
      setMovies(allMovies);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchMovieData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleDelete = async (movie: Movie) => {
    const originalMovies = [...movies];
    const filterdDeletedmovie = originalMovies.filter(
      (mo) => mo._id !== movie._id
    );
    setMovies(filterdDeletedmovie);
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if ((ex as AxiosError)?.response?.status === 400) {
        toast.error("This movie has already been deleted");
        console.log(ex)
      }
      setMovies(originalMovies);
    }
  };

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
        <Link
          to="/movies/new"
          className="btn btn-primary"
          style={{ marginBottom: 20, marginTop: 10 }}
        >
          New Movie
        </Link>
        {filteredMovies.length > 0 ? (
          <Text>Showing {filteredMovies.length} movies in the database.</Text>
        ) : (
          <Text>There are no movies in the database</Text>
        )}
        <SearchBox
          value={searchQuery}
          onChange={(value) => handleSearch(value)}
        />
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
