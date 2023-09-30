import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

interface CurrentUser {
  email: string;
  iat: number;
  name: string;
  _id: string;
}

const Layout = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      setCurrentUser(user);
      // console.log(user)
    } catch (ex) {
      // intentionally empty catch block
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <NavBar user={currentUser} onLogout={() => setCurrentUser(currentUser)} />
      <Outlet />
    </>
  );
};

export default Layout;
