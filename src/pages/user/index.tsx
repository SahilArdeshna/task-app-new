import { useForm } from "react-hook-form";
import { FC, useEffect, useMemo, useState } from "react";

import Private from "../../layouts/types/Private";
import * as userService from "../../services/user";
import { useAuth } from "../../context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { withLayout } from "../../layouts/withLayout";
import { userValidation } from "../../schemas/validation/user";
import Container from "../../components/ui/container/Container";

type IUserSchema = {
  name: string;
  email: string;
};

const Profile: FC = () => {
  const { user, setUser } = useAuth();

  const [newAvatar, setNewAvatar] = useState<string>("");

  const {
    reset,
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors, isSubmitting },
  } = useForm<IUserSchema>({
    resolver: yupResolver(userValidation),
  });

  const renderProfileImage = useMemo(() => {
    let src = "/images/default-profile-img.png";

    if (newAvatar) {
      src = newAvatar;
    } else if (user?.avatar) {
      src = user?.avatar;
    }

    return <img alt="profile-img" src={src} width={200} height={200} />;
  }, [newAvatar, user?.avatar]);

  const onSubmit = async (values: IUserSchema) => {
    try {
      if (!user) return;

      console.log("values", values);

      const payload = {
        ...values,
        email: user.email,
        avatar: user.avatar || "",
      };

      const updated_user = await userService.updateUser(payload);
      setUser(updated_user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!user) return;

    reset({ ...user });
  }, [user, reset]);

  return (
    <div className="pt-5 w-full h-full">
      <Container>
        <div className="pt-8 space-x-6 flex flex-row items-center justify-center h-full">
          <div>{renderProfileImage}</div>
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 space-y-6 bg-white p-[30px] rounded-md"
            >
              <div className="space-y-5 rounded-md shadow-sm">
                <div>
                  <label
                    htmlFor="email-address"
                    className="text-sm text-gray-700"
                  >
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
                  <label
                    htmlFor="email-address"
                    className="text-sm text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    disabled
                    type="email"
                    id="email-address"
                    {...register("email")}
                    className="bg-gray-100 mt-1 relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                  {errors.email?.message && (
                    <p className="text-xs text-red-600 mt-[2px]">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting || !isDirty || !isValid}
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white enabled:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default withLayout(Profile, Private);
