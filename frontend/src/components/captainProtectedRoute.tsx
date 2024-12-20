import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CaptainProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(false);
  const token = localStorage.getItem("token");
  const getCaptainProfile = async () => {
    const token = localStorage.getItem("token");
    const url = `http://localhost:3000/api/v1/captain/profile`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.data.status != 200) {
      return false;
    } else {
      return true;
    }
  };
  useEffect(() => {
    const checkAuth = async () => {
      if (token == null) {
        setIsAuthenticated(false);
        navigate("/captain/login");
      } else {
        try {
          const success = await getCaptainProfile();
          if (success) {
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error("Error getting captain profile:", error);
          setIsAuthenticated(false);
          navigate("/captain/login");
        }
      }
    };

    checkAuth();
  }, [token, navigate]);

  if (!isAuthenticated) {
    navigate("/user/login");
    return;
  }

  return <div>{children}</div>;
};
