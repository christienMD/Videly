import { useState } from "react";
import { Genre } from "../services/genre-service";
import useGenres from "../hooks/useGenres";

export interface Genres {
  onSelectGenre: (genre: Genre) => void;
}

const GenreListGroup = ({ onSelectGenre }: Genres) => {
  const { allGenres: genres } = useGenres();
  // console.log("genres: ", genres);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  const handleGenreClick = (genre: Genre) => {
    setSelectedGenre(genre);
    console.log("selected genre: ", genre);
    onSelectGenre(genre);
  };

  return (
    <ul className="list-group">
      {genres.map((genre) => (
        <li
          onClick={() => {
            handleGenreClick(genre);
          }}
          key={genre._id}
          className={
            genre === selectedGenre
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

export default GenreListGroup;
