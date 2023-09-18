import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import Rentals from "./pages/Rentals";
import Customers from "./pages/Customers";
import ErrorPage from "./pages/ErrorPage";
import MovieForm from "./pages/MovieForm";
import LoginForm from "./components/LoginForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "rentals", element: <Rentals /> },
      { path: "customers", element: <Customers /> },
      { path: "movies/:id", element: <MovieForm /> },
      { path: "login", element: <LoginForm /> },
    ],
  },
]);

export default router;
