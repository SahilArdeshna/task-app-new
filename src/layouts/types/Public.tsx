import { useNavigate } from "react-router";
import { FC, PropsWithChildren, useEffect } from "react";

import { useAuth } from "../../context/AuthContext";

const Public: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (user && !isLoading) {
      return navigate("/tasks");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div className="bg-gray-100 h-full">{children}</div>;
};

export default Public;
