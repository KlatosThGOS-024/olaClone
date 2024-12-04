import { Input } from "./SignUp";

export const Login = ({ userType }: { userType: string }) => {
  return (
    <section className=" w-[414px] mx-auto p-[44px]">
      <p className=" text-center ">
        <span className=" ">Ola</span>
      </p>
      <p className=" text-[18px]">Login as {userType}</p>
      <div className="my-[36px]">
        <Input label="Username" placeholder="JohnDoe123" />
        <Input label="Email" placeholder="JohnDoe@xyz.com" />
        <Input label="Password" placeholder="JohnDoe123@" />
      </div>
      <button className="mb-4 w-full bg-black text-white px-[18px] rounded-lg py-[12px] ">
        Login
      </button>
      <p className="text-gray-400">
        Create an Account <a href="#">Sign Up</a>
      </p>
    </section>
  );
};
