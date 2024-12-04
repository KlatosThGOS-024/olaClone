export function Input({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div className=" mb-6 ">
      <label className=" text-[24px]">{label}</label>
      <input
        className=" rounded-md py-2 w-full bg-gray-200 border-black border-[1px] placeholder:px-2"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
}

export const Signup = ({ userType }: { userType: string }) => {
  return (
    <section className=" w-[414px] mx-auto p-[44px]">
      <p className=" text-center flex gap-3  justify-center ">
        <img src="../../public/images/olaIcon.png" className=" w-[44px]" />
        <span className=" text-[28px]">Ola</span>
      </p>
      <p className=" text-[18px]">Create An account for {userType}</p>
      <div className="my-[36px]">
        <div className=" flex flex-row gap-2">
          <Input label="First Name" placeholder="John" />
          <Input label="Last Name" placeholder="Doe" />
        </div>
        <Input label="Username" placeholder="JohnDoe123" />
        <Input label="Email" placeholder="JohnDoe@xyz.com" />
        <Input label="Password" placeholder="JohnDoe123@" />
      </div>
      <button className="mb-4 w-full bg-black text-white px-[18px] rounded-lg py-[12px] ">
        Sign Up
      </button>
      <p className="text-gray-400">
        Already Have an Account <a href="#">Login</a>
      </p>
      <p className="text-gray-400">
        Join as{" "}
        <a href="#" className=" underline underline-offset-2">
          Captain
        </a>
      </p>
    </section>
  );
};
