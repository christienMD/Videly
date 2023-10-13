import { User, register } from "../services/userService";

const registerUser = async (user: User) => {
  try {
    const res = await register(user);
    localStorage.setItem("token", res.headers["x-auth-token"]);
  } catch (ex) {
    console.log(ex);
  }
};

export default registerUser;
