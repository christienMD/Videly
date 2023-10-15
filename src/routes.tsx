import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import Rentals from "./pages/Rentals";
import Customers from "./pages/Customers";
import ErrorPage from "./pages/ErrorPage";
import MovieForm from "./pages/MovieForm";
import LoginForm from "./pages/LoginForm";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import { PrivateRouts } from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "rentals", element: <Rentals /> },
      { path: "customers", element: <Customers /> },
      { path: "login", element: <LoginForm /> },
      { path: "logout", element: <Logout /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    element: <PrivateRouts />,
    children: [{ path: "movies/:id", element: <MovieForm /> }],
  },
]);

export default router;
