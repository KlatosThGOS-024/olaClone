import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const token = localStorage.getItem("token");

  const getUserProfile = async () => {
    const url = `http://localhost:3000/api/v1/user/user-profile`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    return data.data.status === 200;
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setIsAuthenticated(false);
        navigate("/user/login");
        return;
      }

      try {
        const success = await getUserProfile();
        setIsAuthenticated(success);
        if (!success) {
          navigate("/user/login");
        }
      } catch (error) {
        console.error("Error getting user profile:", error);
        setIsAuthenticated(false);
        navigate("/user/login");
      }
    };

    checkAuth();
  }, [token, navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Render loading state while checking authentication
  }

  if (!isAuthenticated) {
    return null; // Don't render children, redirect will occur
  }

  return <div>{children}</div>;
};
