import { Flex } from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import UserProfile from "./UserProfile";
interface CurrentUser {
  email: string;
  iat: number;
  name: string;
  _id: string;
}

interface Props {
  user: CurrentUser | null;
}

const NavBar = ({ user }: Props) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary align-center">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Vidly
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <Flex className="navbar-nav align-items-center" width="100%">
            <NavLink className="nav-link active" aria-current="page" to="/">
              Movies
            </NavLink>
            <NavLink className="nav-link" to="/customers">
              Customers
            </NavLink>
            <NavLink className="nav-link" to="rentals">
              Rentals
            </NavLink>

            {!user && (
              <>
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </>
            )}

            {user && (
              <>
                <UserProfile user={user} />
              </>
            )}
          </Flex>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
