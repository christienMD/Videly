// import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { FormEvent, useState } from "react";

interface UserLogin {
  username: string;
  password: string;
}

const LoginForm = () => {
  const [user, setUser] = useState<UserLogin>({} as UserLogin);
  

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const { data: jwt } = await login(user.username, user.password);
      localStorage.setItem("token", jwt);
      (window.location as unknown as string) = "/";
    
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-3">
          <label htmlFor="username">Name</label>
          <input
            onChange={(event) =>
              setUser({ ...user, username: event.target.value })
            }
            value={user.username}
            id="username"
            type="email"
            placeholder="enter your email"
            className="form-control"
          />
          {/* {errors.name && <p className="text-danger">{errors.name.message}</p>} */}
        </div>
        <div className="form-group mt-3">
          <label htmlFor="password">Password</label>
          <input
            onChange={(event) =>
              setUser({ ...user, password: event.target.value })
            }
            value={user.password}
            id="password"
            type="password"
            className="form-control"
          />
          {/* {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )} */}
        </div>
        <button type="submit" className="mt-3 btn btn-primary">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
