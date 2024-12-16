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
      const captainResponse: loginType = await axios.post(
        "http://localhost:3000/api/v1/captain/login",
        {
          username,
          password,
        }
      );
      //@ts-ignore
      const token = captainResponse.data.data.accessToken;
      //@ts-ignore
      localStorage.setItem("token", token);
      navigate("/captain/home");
    } else {
      const userResponse: loginType = await axios.post(
        `http://localhost:3000/api/v1/user/login`,
        {
          username,
          password,
        }
      );
      //@ts-ignore
      localStorage.setItem("token", userResponse.data?.data);
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
