import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainProtectWrapper = ({ children }: any) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  // string | JwtPayload

  useEffect(() => {
    if (!token) {
      console.log("ghello");
      navigate("/captain/login");
    }

    axios
      .get(`http://localhost:3000/api/v1/captain/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((response) => {
        if (response.status === 200) {
          console.log("ghello");
          setIsLoading(false);
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/captain/login");
      });
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;
