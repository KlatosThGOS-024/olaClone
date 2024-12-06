import { useState } from "react";
import { Link } from "react-router-dom";

export function Input({
  label,
  placeholder,
  setInput,
}: {
  label: string;
  placeholder: string;
  setInput: any;
}) {
  return (
    <div className=" mb-6 ">
      <label className=" text-[24px]">{label}</label>
      <input
        onChange={(e) => {
          setInput(e.target.value);
        }}
        className=" rounded-md py-2 w-full bg-gray-200 border-black border-[1px] placeholder:px-2"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
}

export const Signup = ({ userType }: { userType: string }) => {
  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  function send() {
    console.log(firstName);
  }
  return (
    <section className=" w-[414px] mx-auto p-[44px]">
      <p className=" text-center flex gap-3  justify-center ">
        <img src="../../public/images/olaIcon.png" className=" w-[44px]" />
        <span className=" text-[28px]">Ola</span>
      </p>
      <p className=" text-[18px]">
        Create An account for <span className=" capitalize">{userType}</span>
      </p>
      <div className="my-[36px]">
        <div className=" flex flex-row gap-2">
          <Input
            setInput={setFirstName}
            label="First Name"
            placeholder="John"
          />
          <Input setInput={setLastName} label="Last Name" placeholder="Doe" />
        </div>
        <Input
          setInput={setUsername}
          label="Username"
          placeholder="JohnDoe123"
        />
        <Input
          setInput={setPassword}
          label="Email"
          placeholder="JohnDoe@xyz.com"
        />
        <Input setInput={setEmail} label="Password" placeholder="JohnDoe123@" />
      </div>
      <button
        onClick={send}
        className="mb-4 w-full bg-black text-white px-[18px] rounded-lg py-[12px] "
      >
        Sign Up
      </button>
      <p className="text-gray-400">
        Already Have an Account <Link to={`/${userType}/login`}>Login</Link>
      </p>
      <p className="text-gray-400">
        Join as
        <span className=" underline underline-offset-2">
          <Link to={`/captain/signUp`}> Captain </Link>
        </span>
      </p>
    </section>
  );
};
