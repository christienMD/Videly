import { FaSortUp } from "react-icons/fa";
import { SortColumn } from "../utils/sortedMovies";

interface Props {
  column: string;
  sortColumn: SortColumn;
}

const SortIcon = ({ column, sortColumn }: Props) => {
  if (column !== sortColumn.path) return null;
  if (sortColumn.order === "asc") return <FaSortUp />;
};

export default SortIcon;
