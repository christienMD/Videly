import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { CurrentUser } from "../pages/Layout";

const useGetCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  // useEffect(() => {
  //   const jwt = localStorage.getItem("token");
  //   try {
  //     const user = jwtDecode(jwt);
  //     setCurrentUser(user);
  //   } catch (ex) {
  //     // intentionally empty catch block
  //   }
  // }, []);
  // return { currentUser, setCurrentUser };

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    try {
      const user = jwtDecode(jwt);
      setCurrentUser(user);
    } catch (ex) {
      // intentionally empty catch block
    } finally {
      setLoading(false); // Set loading to false after attempting to fetch user
    }
  }, []);

  return { currentUser, loading };
};

export default useGetCurrentUser;
