import { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Public from "../../layouts/types/Public";
import { withLayout } from "../../layouts/withLayout";
import { registerValidationSchema } from "../../schemas/validation/auth";

type IRegisterSchema = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Registration: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IRegisterSchema>({
    resolver: yupResolver(registerValidationSchema),
  });

  const onSubmit = async (values: IRegisterSchema) => {
    try {
      console.log("values", values);
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
            Create new account
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6 bg-white p-[30px] rounded-md"
        >
          <div className="space-y-5 rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="text-sm text-gray-700">
                Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                className="mt-1 relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
              {errors.name?.message && (
                <p className="text-xs text-red-600 mt-[2px]">
                  {errors.name.message}
                </p>
              )}
            </div>
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
            <div>
              <label htmlFor="password" className="text-sm text-gray-700">
                Confirm password
              </label>
              <input
                type="password"
                id="confirm-password"
                {...register("confirmPassword")}
                className="mt-1 relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
              {errors.confirmPassword?.message && (
                <p className="text-xs text-red-600 mt-[2px]">
                  {errors.confirmPassword.message}
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
              Register
            </button>
          </div>

          <div className="text-sm flex justify-end gap-[5px]">
            <span className="text-gray-700">Already have an account?</span>
            <a
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withLayout(Registration, Public);
