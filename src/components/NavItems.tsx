
import { Flex } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import UserProfile from './UserProfile';
import { CurrentUser } from '../pages/Layout';

interface Props{
    user: CurrentUser | null,
}

const NavItems = ({user}: Props) => {
  return (
    <Flex as="nav" alignItems="center" p="2" gap="10px">
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        <h4>Videly</h4>
      </NavLink>
      <NavLink to="/">Movies</NavLink>

      <NavLink to="/customers">Customers</NavLink>

      <NavLink to="rentals">Rentals</NavLink>
      {!user && (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">SignUp</NavLink>
        </>
      )}

      {user && (
        <>
          <UserProfile user={user} />
        </>
      )}
    </Flex>
  );
}

export default NavItems