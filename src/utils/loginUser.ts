import { login } from "../services/authService";

export interface UserLogin {
  username: string;
  password: string;
}

const loginUser = async (user: UserLogin) => {
  try {
    const { data: jwt } = await login(user.username, user.password);
    localStorage.setItem("token", jwt);
    return jwt;
  } catch (ex) {
    console.log(ex);
  }
};

export default loginUser;
