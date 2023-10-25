
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import ColorModeSwitch from "./ColorModeSwitch";
import { NavLink } from "react-router-dom";
import UserProfile from "./UserProfile";

interface CurrentUser {
  email: string;
  iat: number;
  name: string;
  _id: string;
}

interface NavBarProps {
  user: CurrentUser;
}
interface NavLinkProps {
  children: React.ReactNode;
  to: string;
}

const NavLinks = ({ children, to }: NavLinkProps) => {
  return (
    <Box
      as={NavLink}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.800", "gray.700"),
      }}
      to={to}
    >
      {children}
    </Box>
  );
};

const NavBar = ({ user }: NavBarProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems="center" justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={
              isOpen ? (
                <AiOutlineClose size={20} />
              ) : (
                <GiHamburgerMenu size={20} />
              )
            }
            ps={2}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>Videly</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <NavLinks to="/">Movies</NavLinks>
              <NavLinks to="/customers">Customers</NavLinks>
              <NavLinks to="/Rentals">Customers</NavLinks>/{" "}
              {!user && (
                <>
                  <NavLinks to="/login">Login</NavLinks>
                  <NavLinks to="/register">Sign Up</NavLinks>
                </>
              )}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            {user && (
              <>
                <UserProfile user={user} />
              </>
            )}
            <ColorModeSwitch />
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <NavLinks to="/movies">Movies</NavLinks>
              <NavLinks to="/customers">Customers</NavLinks>
              <NavLinks to="/Rentals">Customers</NavLinks>
              {!user && (
                <>
                  <NavLinks to="/login">Login</NavLinks>
                  <NavLinks to="/register">Sign Up</NavLinks>
                </>
              )}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default NavBar;
