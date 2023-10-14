import {
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  Avatar,
  Box,
} from "@chakra-ui/react";
import { CurrentUser } from "../pages/Layout";
import { Link } from "react-router-dom";

interface Props {
  user: CurrentUser;
}

const UserProfile = ({ user }: Props) => {
  return (
    <Box ms="auto">
      <Menu>
        <MenuButton as={Avatar} />
        <MenuList>
          <MenuGroup title="My Account">
            <MenuItem>{user.name}</MenuItem>
            <MenuItem>{user.email}</MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="More">
            <MenuItem>FAQ</MenuItem>
            <MenuItem>
              <Link to="/logout">Logout</Link>
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default UserProfile;
