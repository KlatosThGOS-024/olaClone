import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token == null) {
      setIsAuthenticated(false);
      navigate("/user/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [token, navigate]);

  if (isAuthenticated === null) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <div>{children}</div>;
};
