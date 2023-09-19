import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";

const schema = z.object({
  username: z.string().email({ message: "username must be a valid email" }),
  name: z.string().min(5, { message: "Name must be at least 5 characters." }),
  password: z
    .string()
    .min(5, { message: "password must be at least 5 characters long" })
    .max(25, { message: "password cannot exceede 20 characters" }),
});

type FormData = z.infer<typeof schema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmitLogin = (data: FieldValues) => console.log(data);

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmitLogin)}>
        <div className="form-group mt-3">
          <label htmlFor="email">Username</label>
          <input
            {...register("username")}
            placeholder="mdchristien@gmail.com"
            id="email"
            type="email"
            className="form-control"
          />
          {errors.username && (
            <p className="text-danger">{errors.username.message}</p>
          )}
        </div>
        <div className="form-group mt-3">
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            id="password"
            type="password"
            className="form-control"
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>
        <div className="form-group mt-3">
          <label htmlFor="username">Name</label>
          <input
            {...register("name")}
            placeholder="Enter your name"
            id="username"
            type="text"
            className="form-control"
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>
        <button type="submit" disabled={!isValid} className="mt-3 btn btn-primary">
          Login
        </button>
      </form>
    </>
  );
};

export default Register;
