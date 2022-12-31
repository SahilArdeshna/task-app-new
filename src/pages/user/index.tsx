import { toast } from "react-toastify";
import { isEmpty, isNull } from "lodash";
import { useForm } from "react-hook-form";
import {
  FC,
  useRef,
  useMemo,
  useState,
  useEffect,
  ChangeEvent,
  useCallback,
} from "react";

import Private from "../../layouts/types/Private";
import * as userService from "../../services/user";
import { useAuth } from "../../context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { withLayout } from "../../layouts/withLayout";
import Button from "../../components/ui/button/Button";
import { userValidation } from "../../schemas/validation/user";
import Container from "../../components/ui/container/Container";

type IUserSchema = {
  name: string;
  email: string;
};

const Profile: FC = () => {
  const { user, setUser } = useAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File>();
  const [newAvatar, setNewAvatar] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors, isSubmitting },
  } = useForm<IUserSchema>({
    resolver: yupResolver(userValidation),
  });

  const cancelClickHandler = () => setNewAvatar("");

  const saveClickHandler = useCallback(async () => {
    try {
      if (!file) return;
      setIsSaving(true);

      const formData = new FormData();
      formData.append("avatar", file);

      const res = await userService.uploadProfile(formData);
      toast.success(res.message);
      setUser({ ...user, ...res.user });
      setNewAvatar("");
      setFile(undefined);
    } catch (err) {
      console.log("err", err);
      toast.error("Error while uploading avatar!");
    } finally {
      setIsSaving(false);
    }
  }, [file, user, setUser]);

  const renderProfileImage = useMemo(() => {
    let src = "/images/default-profile-img.png";

    if (newAvatar) {
      src = newAvatar;
    } else if (user?.avatar) {
      const base64String = user?.avatar.toString("base64");
      src = `data:image/png;base64,${base64String}`;
    }

    return (
      <div className="space-y-[10px]">
        <img
          src={src}
          alt="profile-img"
          onClick={() => inputRef.current?.click()}
          className="w-[258px] h-[258px] cursor-pointer rounded-full bg-white p-2"
        />
        {newAvatar && (
          <div className="flex flex-rows items-center w-full justify-center gap-[10px]">
            <Button
              disabled={isSaving}
              onClick={cancelClickHandler}
              removeClass="bg-brand-600 hover:bg-brand-700 focus:ring-brand-500"
              appendClass="bg-og-red-600 hover:bg-og-red-700 focus:ring-og-red-500"
            >
              Cancel
            </Button>
            <Button isLoading={isSaving} onClick={saveClickHandler}>
              Save
            </Button>
          </div>
        )}
      </div>
    );
  }, [newAvatar, user?.avatar, isSaving, saveClickHandler]);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (isEmpty(files) || isNull(files)) return;

    const file = files[0];
    setFile(file);
    e.target.value = "";
  };

  const onSubmit = async (values: IUserSchema) => {
    try {
      if (!user) return;

      const payload = {
        ...values,
        email: user.email,
      };

      const res = await userService.updateUser(payload);
      setUser(res.user);
      toast.success(res.message);
    } catch (err: any) {
      console.log(err);
      let error = "Something went wrong, Please try agian later!";
      if (err.response && err.response.data) {
        error = err.response.data;
      }

      toast.error(error);
    }
  };

  useEffect(() => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    setNewAvatar(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    if (!user) return;

    reset({ name: user.name, email: user.email });
  }, [user, reset]);

  return (
    <div className="pt-5">
      <Container>
        <div className="pt-8 flex flex-row items-center gap-[100px] h-full justify-center">
          <div className="relative group">
            <div className="absolute hidden">
              <input
                type="file"
                ref={inputRef}
                accept="image/*"
                onChange={inputChangeHandler}
              />
            </div>
            {renderProfileImage}
          </div>
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 bg-white p-[30px] rounded-md"
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
                <Button
                  type="submit"
                  appendClass="w-full"
                  disabled={isSubmitting || !isDirty || !isValid}
                >
                  Update
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default withLayout(Profile, Private);
