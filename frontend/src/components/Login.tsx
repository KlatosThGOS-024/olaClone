import { Link, useNavigate } from "react-router-dom";
import { Input } from "./SignUp";
import { useState } from "react";
import axios from "axios";
type loginType = {
  data: string;
};

export const Login = ({ userType }: { userType: string }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function send() {
    if (userType == "captain") {
      const response: loginType = await axios.post(
        "http://localhost:3000/captain/login",
        {
          username,
          password,
        }
      );
      const token = response.data;
      //@ts-ignore
      localStorage.setItem("token", token.data);
      navigate("/home");
    } else {
      const response: loginType = await axios.post(
        `http://localhost:3000/user/login`,
        {
          username,
          password,
        }
      );
      //@ts-ignore
      localStorage.setItem("token", response.data?.data);

      navigate("/home");
    }
  }

  return (
    <section className=" w-[414px] mx-auto p-[44px]">
      <p className=" text-center ">
        <span className=" ">Ola</span>
      </p>
      <p className=" text-[18px]">
        Login as <span className=" capitalize">{userType}</span>
      </p>
      <div className="my-[36px]">
        <Input
          label="Username"
          placeholder="JohnDoe123"
          setInput={setUsername}
        />

        <Input
          label="Password"
          placeholder="JohnDoe123@"
          setInput={setPassword}
        />
      </div>
      <button
        onClick={send}
        className="mb-4 w-full bg-black text-white px-[18px] rounded-lg py-[12px] "
      >
        Login
      </button>
      <p className="text-gray-400">
        <Link to={`/${userType}/signUp`}> Create an Account </Link>
      </p>
    </section>
  );
};
