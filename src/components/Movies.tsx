import { Button, Table, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Movie } from "../services/fakeMovieService";
import { tableHeaders } from "../App";

interface Movies {
  movies: Movie[];
  onDelete: (movie: Movie) => void;
  moviesCount: number;
}

const Movies = ({ movies, onDelete, moviesCount }: Movies) => {
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
                <Button
                  onClick={() => onDelete(movie)}
                  colorScheme="red"
                  size="sm"
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Movies;
