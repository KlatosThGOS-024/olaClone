import { Link, useNavigate } from "react-router-dom";
import { Input } from "./SignUp";
import { useState } from "react";
import axios from "axios";

export const Login = ({ userType }: { userType: string }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function send() {
    if (userType == "captain") {
      const captainResponse = await axios.post(
        "http://localhost:3000/api/v1/captain/login",
        {
          username,
          password,
        }
      );
      const token = captainResponse.data.data.accessToken;
      localStorage.setItem("token", token);
      navigate("/captain/home");
    } else {
      const userResponse: any = await axios.post(
        `http://localhost:3000/api/v1/user/login`,
        {
          username,
          password,
        }
      );
      localStorage.setItem("token", userResponse.data?.data);
      navigate("/user/home");
    }
  }

  return (
    <section className=" relative w-full my-[28px]">
      <div
        className="w-[414px] mx-auto p-[44px] rounded-lg bg-white shadow-lg px-[22px] py-[28px] 
        "
      >
        <p className=" mb-[28px] text-center flex gap-3  justify-center ">
          <img src="/images/olaIcon.png" className=" w-[44px]" />
          <span className=" text-[28px]">Ola</span>
        </p>
        <p className="text-black font-[500] text-[18px]">
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
          <a> New here </a>
          <Link to={`/${userType}/signUp`}>
            {" "}
            <span className=" hover:text-black hover:underline text-blue-500">
              Create an Account?
            </span>{" "}
          </Link>
        </p>
      </div>
    </section>
  );
};
