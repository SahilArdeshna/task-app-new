import {
  FC,
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
  PropsWithChildren,
} from "react";

import { me } from "../services/user";
import { IUser } from "../types/IUser";
import { ERROR_WENT_WRONG } from "../utils/constants";

type AuthContextProps = {
  user?: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
};

export const AuthContext = createContext<AuthContextProps>({
  user: undefined,
  isLoading: false,
  setUser: () => {},
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUser = useCallback(async () => {
    try {
      setIsLoading(true);

      const user = await me();
      if (!user) throw new Error(ERROR_WENT_WRONG);

      setUser(user);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
