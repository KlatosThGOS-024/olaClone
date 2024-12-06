import { Link } from "react-router-dom";
import { Input } from "./SignUp";

export const Login = ({ userType }: { userType: string }) => {
  return (
    <section className=" w-[414px] mx-auto p-[44px]">
      <p className=" text-center ">
        <span className=" ">Ola</span>
      </p>
      <p className=" text-[18px]">
        Login as <span className=" capitalize">{userType}</span>
      </p>
      <div className="my-[36px]">
        <Input label="Username" placeholder="JohnDoe123" setInput={undefined} />
        <Input
          label="Email"
          placeholder="JohnDoe@xyz.com"
          setInput={undefined}
        />
        <Input
          label="Password"
          placeholder="JohnDoe123@"
          setInput={undefined}
        />
      </div>
      <button className="mb-4 w-full bg-black text-white px-[18px] rounded-lg py-[12px] ">
        Login
      </button>
      <p className="text-gray-400">
        <Link to={`/${userType}/signUp`}> Create an Account </Link>
      </p>
    </section>
  );
};
