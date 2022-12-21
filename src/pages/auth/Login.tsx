import { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { login } from "../../services/user";
import Public from "../../layouts/types/Public";
import { setItem } from "../../utils/localstorage";
import { useAuth } from "../../context/AuthContext";
import { withLayout } from "../../layouts/withLayout";
import { loginValidationSchema } from "../../schemas/validation/auth";

type ILoginSchema = {
  email: string;
  password: string;
};

const Login: FC = () => {
  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginSchema>({ resolver: yupResolver(loginValidationSchema) });

  const onSubmit = async (values: ILoginSchema) => {
    try {
      const data = await login(values);

      setItem(process.env.REACT_APP_TOKEN_NAME || "", data.token);
      setUser(data.user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            alt="Logo"
            src="/images/logo_512.png"
            className="mx-auto h-14 w-auto"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6 bg-white p-[30px] rounded-md"
        >
          <div className="space-y-5 rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="text-sm text-gray-700">
                Email address
              </label>
              <input
                type="email"
                id="email-address"
                {...register("email")}
                className="mt-1 relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
              {errors.email?.message && (
                <p className="text-xs text-red-600 mt-[2px]">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="text-sm text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password")}
                className="mt-1 relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
              {errors.password?.message && (
                <p className="text-xs text-red-600 mt-[2px]">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white enabled:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Log in
            </button>
          </div>

          <div className="text-sm flex justify-end gap-[5px]">
            <span className="text-gray-700">Need an account?</span>
            <a
              href="/registration"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withLayout(Login, Public);
