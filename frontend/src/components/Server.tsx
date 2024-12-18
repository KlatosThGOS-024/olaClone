import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const Server = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {}, []);

  return <div>{message}</div>;
};
