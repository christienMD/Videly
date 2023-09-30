import { useNavigate } from "react-router-dom";
import { User, register } from "../services/userService";
import { FormEvent, useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({} as User);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const res = await register(user);
      localStorage.setItem("token", res.headers["x-auth-token"]);
      navigate("/");
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-3">
          <label htmlFor="email">Username</label>
          <input
            onChange={(event) =>
              setUser({ ...user, username: event.target.value })
            }
            value={user.username}
            placeholder="mdchristien@gmail.com"
            id="email"
            type="email"
            className="form-control"
          />
          {/* {errors.username && (
            <p className="text-danger">{errors.username.message}</p>
          )} */}
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
        <div className="form-group mt-3">
          <label htmlFor="username">Name</label>
          <input
            onChange={(event) => setUser({ ...user, name: event.target.value })}
            placeholder="Enter your name"
            value={user.name}
            id="username"
            type="text"
            className="form-control"
          />
          {/* {errors.name && <p className="text-danger">{errors.name.message}</p>} */}
        </div>
        <button type="submit" className="mt-3 btn btn-primary">
          Register
        </button>
      </form>
    </>
  );
};

export default Register;
