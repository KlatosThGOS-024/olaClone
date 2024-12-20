import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const BACKEND_URI = "http://localhost:3000";
type InputType = {
  label: string;
  placeholder: string; // React.Dispatch<React.SetStateAction<boolean>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
};
export function Input({ label, placeholder, setInput }: InputType) {
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
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [color, setColor] = useState("");
  const [type, setType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [plate, setPlate] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  async function send() {
    if (userType === "captain") {
      await axios.post(`${BACKEND_URI}/api/v1/captain/signUp`, {
        username,
        firstName,
        password,
        email,
        lastName,
        vehicle: {
          color,
          vehicleType: type,
          capacity: +capacity,
          plate,
        },
        location: {
          lat: 2354,
          long: 2354,
        },
      });
      navigate("/captain/login");
    } else {
      await axios.post(`${BACKEND_URI}/api/v1/user/signUp`, {
        username,
        firstName,
        password,
        email,
        lastName,
      });
      navigate("/user/login");
    }
  }

  return (
    <section className="relative w-full my-[14px] ">
      <div
        className={` mx-auto rounded-lg bg-white shadow-lg px-[22px] ${
          userType === "user" ? "py-[20px]" : ""
        } w-[380px]`}
      >
        <p className=" mb-[28px] text-center flex gap-3  justify-center ">
          <img src="/images/olaIcon.png" className=" w-[44px]" />
          <span className=" text-[28px]">Ola</span>
        </p>
        <p className="text-black font-[500] text-[18px]">
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
            setInput={setEmail}
            label="Email"
            placeholder="JohnDoe@xyz.com"
          />
          <Input
            setInput={setPassword}
            label="Password"
            placeholder="JohnDoe123@"
          />
          {userType == "captain" && (
            <>
              <p>Please enter your vehicle info</p>
              <div className=" grid grid-cols-2 gap-2">
                <Input setInput={setColor} label="Color" placeholder="Red" />
                <Input setInput={setType} label="Type" placeholder="Bike" />
                <Input
                  setInput={setCapacity}
                  label="Capacity"
                  placeholder="2"
                />
                <Input setInput={setPlate} label="Plate" placeholder="Xyz" />
              </div>
            </>
          )}
        </div>
        <button
          onClick={send}
          className="mb-4 w-full bg-black text-white px-[18px] rounded-lg py-[7px] "
        >
          Sign Up
        </button>
        <p className="text-black text-[14px] font-[500] text-center">
          Already Have an Account?{" "}
          <Link to={`/${userType}/login`}>
            <a className=" hover:text-black hover:underline text-blue-500">
              Login
            </a>
          </Link>
        </p>
        <p className="text-gray-400">
          Join as
          <span className=" underline underline-offset-2">
            <Link to={`/${userType === "captain" ? "User" : "Captain"}/signUp`}>
              {" "}
              {userType === "captain" ? "User" : "Captain"}{" "}
            </Link>
          </span>
        </p>
      </div>
    </section>
  );
};
