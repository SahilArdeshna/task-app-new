import { useNavigate } from "react-router";
import { FC, PropsWithChildren, useEffect } from "react";

import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/ui/loader/Loader";

const Public: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (user && !isLoading) {
      return navigate("/tasks");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center h-full">
        <Loader />
      </div>
    );
  }

  return <div className="bg-gray-100 h-screen">{children}</div>;
};

export default Public;
