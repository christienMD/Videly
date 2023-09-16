import { Table, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Movie } from "../services/fakeMovieService";
import { tableHeaders } from "../App";
import Like from "./common/Like";
import Pagination from "./common/Pagination";
import { useState } from "react";

interface Movies {
  movies: Movie[];
  onDeleteMovie: (movie: Movie) => void;
  moviesCount: number;
  onClickLike: (movie: Movie) => void;
}

const Movies = ({
  movies,
  onDeleteMovie,
  moviesCount,
  onClickLike,
}: Movies) => {
    const [currentPage, setCurrentPage] = useState(1)
    const handlePageChange = (page:number) => {
      setCurrentPage(page)
    }

  return (
    <>
      {moviesCount > 0 ? (
        <Text>Showing {moviesCount} in the database.</Text>
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
          {movies.map((movie) => (
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
      <Pagination currentPage={currentPage} itemsCount={movies.length} pageSize={4} onPageChange={(page) => handlePageChange(page)}/>
    </>
  );
};

export default Movies;
