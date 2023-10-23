import { Heading, Text } from "@chakra-ui/react";
import { FetchMovieResponse } from "../services/movie-service";

interface Props {
  filteredMovies: FetchMovieResponse[];
}

const MovieHeading = ({ filteredMovies }: Props) => {
  return (
    <Heading
      as="h1"
      marginY={5}
      fontSize={{ base: "2xl", md: "3xl", lg: "5xl" }}
    >
      {filteredMovies.length > 0 ? (
        <Text>Showing {filteredMovies.length} movies in the database.</Text>
      ) : (
        <Text>There are no movies in the database</Text>
      )}
    </Heading>
  );
};

export default MovieHeading;
