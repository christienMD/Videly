import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";

const schema = z.object({
  name: z.string().min(5, { message: "Name must be at least 5 characters." }),
  password: z
    .string()
    .min(5, { message: "password must be at least 5 characters long" })
    .max(25, { message: "password cannot exceede 20 characters" }),
});

type FormData = z.infer<typeof schema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmitLogin = (data: FieldValues) => console.log(data);

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmitLogin)}>
        <div className="form-group">
          <label htmlFor="username"></label>
          <input
            {...register("name")}
            id="username"
            type="text"
            className="form-control"
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password"></label>
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
        <button disabled={!isValid} className="mt-3 btn btn-primary">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
