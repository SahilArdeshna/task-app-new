import { useNavigate } from "react-router";
import { FC, PropsWithChildren, useEffect } from "react";

import { useAuth } from "../../context/AuthContext";

const Private: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!user && !isLoading) {
      return navigate("/login");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{children}</div>;
};

export default Private;
