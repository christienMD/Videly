import _ from "lodash";
import { Movie } from "../services/fakeMovieService";


export const paginate = (items: Movie[] , pageNumber: number, pageSize : number) => {
  const startIndex = (pageNumber - 1) * pageSize;
 return _(items).slice(startIndex).take(pageSize).value();
};

