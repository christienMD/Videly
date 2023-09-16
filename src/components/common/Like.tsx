import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface Props {
  onClick: () => void;
}

const Like = ({ onClick }: Props) => {
  const [status, setStatus] = useState(false);

  const toggle = () => {
    setStatus(!status);
    onClick();
  };

  if (status)
    return (
      <AiFillHeart style={{ cursor: "pointer" }} size={25} onClick={toggle} />
    );
  return (
    <AiOutlineHeart style={{ cursor: "pointer" }} size={25} onClick={toggle} />
  );
};

export default Like;
