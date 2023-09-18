import { useParams } from "react-router-dom";

const MovieForm = () => {
  const params = useParams();
  console.log(params)

  return <h1>MovieForm</h1>;
};

export default MovieForm;
