import { useForm } from "react-hook-form";
import loginUser, { UserLogin } from "../utils/loginUser";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { z } from "zod";
import { useState } from "react";
import { Button, Input } from "@chakra-ui/react";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Email is required." })
    .max(255)
    .email({ message: "Invalid Email" }),
  password: z.string().min(5, { message: "Password is required." }).max(255),
});

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (user: UserLogin) => {
    await loginUser(user).then((res) => {
      if (res) {
        setErrorMessage(res.message);
      } else {
        setErrorMessage("");
      }
      (window.location as unknown as string) = "/";
    });
  };

  return (
    <>
      <h1>Login</h1>
      <p className="text-danger">{errorMessage}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mt-3">
          <label htmlFor="username">Name</label>
          <Input
            variant="filled"
            {...register("username")}
            id="username"
            type="email"
            placeholder="enter your email"
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
        <Button type="submit" colorScheme="messenger" marginTop={5}>
          Login
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
