import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import registerUser from "../utils/registerUsers";
import { User } from "../services/userService";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { z } from "zod";
import { Box, Button, Input } from "@chakra-ui/react";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Email is required" })
    .max(255)
    .email(),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters." })
    .max(255),
  name: z
    .string()
    .min(5, { message: "Name must be at least 5 characters." })
    .max(255),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ resolver: zodResolver(schema) });
  const navigate = useNavigate();

  const onSubmit = (data: User) => {
    registerUser(data);
    navigate("/");
  };

  return (
    <Box padding={5}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mt-3">
          <label htmlFor="email">Username</label>
          <Input
            variant="filled"
            {...register("username")}
            placeholder="mdchristien@gmail.com"
            id="email"
            type="email"
          />
          {errors.username && (
            <p className="text-danger">{errors.username.message}</p>
          )}
        </div>
        <div className="form-group mt-3">
          <label htmlFor="password">Password</label>
          <Input
            variant="filled"
            {...register("password")}
            id="password"
            type="password"
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>
        <div className="form-group mt-3">
          <label htmlFor="username">Name</label>
          <Input
            variant="filled"
            {...register("name")}
            placeholder="Enter your name"
            id="username"
            type="text"
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>
        <Button type="submit" colorScheme="messenger" mt={5}>
          Sign Up
        </Button>
      </form>
    </Box>
  );
};

export default Register;
