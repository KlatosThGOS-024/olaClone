import { Link } from "react-router-dom";
import { Input } from "./SignUp";
import { useState } from "react";
import axios from "axios";
const BACKEND_URI = "http://localhost:3000";
export const Login = ({ userType }: { userType: string }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  async function send() {
    const response = await axios.post(
      `${BACKEND_URI}/${userType === "user" ? "user" : "captain"}/
      login`,
      {
        username,
        password,
        email,
      }
    );
    return response;
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
          label="Email"
          placeholder="JohnDoe@xyz.com"
          setInput={setEmail}
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
