import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Layout = () => {
  return (
    <>
      <ToastContainer/>
      <NavBar/>
      <Outlet />
    </>
  );
};

export default Layout;
