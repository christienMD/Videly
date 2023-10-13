import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGetCurrentUser from "../hooks/useGetCurrentUser";

export interface CurrentUser {
  email: string;
  iat: number;
  name: string;
  _id: string;
}

const Layout = () => {
  const { currentUser } = useGetCurrentUser();

  return (
    <>
      <ToastContainer />
      <NavBar user={currentUser} />
      <Outlet />
    </>
  );
};

export default Layout;
