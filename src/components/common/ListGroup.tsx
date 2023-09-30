import { useState } from "react";
import { Genre } from "../../hooks/useGenres";


export interface Genres {
  genres: Genre[];
  onSelectGenre: (genre: Genre) => void;
}

const ListGroup = ({ genres, onSelectGenre }: Genres) => {
  const [selectedGenre, setSelectedGenre] = useState<Genre>();
  return (
    <ul className="list-group">
      {genres.map((genre) => (
        <li
          onClick={() => {
            setSelectedGenre(genre);
            onSelectGenre(genre);
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

export default ListGroup;
