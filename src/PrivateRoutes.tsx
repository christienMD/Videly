import { Navigate, Outlet } from "react-router-dom";
import useGetCurrentUser from "./hooks/useGetCurrentUser";

export const PrivateRouts = () => {
  const { currentUser, loading } = useGetCurrentUser();
  console.log("currentUser: ", currentUser);

  if (!loading && !currentUser) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
