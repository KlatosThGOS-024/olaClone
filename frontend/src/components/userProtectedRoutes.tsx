import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserProtectedRoute = ({ children }: any) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/user/login");
    }
  }, [token]);
  return <div>{children}</div>;
};
// Jhony#@234
