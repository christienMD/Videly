import { Heading } from "@chakra-ui/react";
import { FetchMovieResponse } from "../services/movie-service";

interface Props {
  filteredMovies: FetchMovieResponse[];
}

const MovieHeading = ({ filteredMovies }: Props) => {
  return (
    <Heading as="h1" marginY={5} fontSize="5xl">
      {filteredMovies.length > 0 ? (
        <>Showing {filteredMovies.length} movies in the database.</>
      ) : (
        <>There are no movies in the database</>
      )}
    </Heading>
  );
};

export default MovieHeading;
