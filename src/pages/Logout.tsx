import { useEffect } from "react";

const Logout = () => {
    useEffect(() => {
  localStorage.removeItem("token");
  (window.location as unknown as string) = "/";
    }, []);

  return null;
};

export default Logout;
