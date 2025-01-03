import { Link } from "react-router-dom";

export const StartPage = () => {
  return (
    <section className="relative w-full my-[14px] h-[97vh] py-[14px] overflow-y-hidden ">
      <div className=" w-[440px] grid grid-rows-2 mx-auto  ">
        <img src="/images/backGroundImage.avif" className="w-full h-[600px]" />

        <div className=" p-[24px] ">
          <div className=" absolute top-[18px] ">
            <a href="#">
              <img src="/images/olaLogo.png" className="w-[64px]" />
            </a>
          </div>
          <h1 className=" text-[24px] font-semibold ">
            Explore new ways to<br></br> travel with Ola
          </h1>
          <div className=" flex flex-col space-y-5 mt-[28px] ">
            <button className=" bg-black text-white px-[18px] rounded-lg py-[12px] ">
              <Link to={"/user/signUp"}> Continue with Phone Number</Link>
            </button>
            <div className=" grid grid-cols-2 gap-3 ">
              <button
                className=" flex items-center justify-center py-2 gap-1 text-[18px]
               bg-white rounded-lg shadow-xl text-center"
              >
                <svg
                  className=" w-5 h-5  "
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#fbc02d"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                    fill="#e53935"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                    fill="#4caf50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                    fill="#1565c0"
                    d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                </svg>
                <span>Google</span>
              </button>
              <button
                className=" flex items-center justify-center py-2 gap-1 text-[18px]
               bg-white rounded-lg shadow-xl text-center"
              >
                <svg
                  className=" w-5 h-5 "
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#039be5"
                    d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                  ></path>
                </svg>{" "}
                <span>Facebook</span>
              </button>
            </div>
            <p className=" text-gray-400 ">
              By continuing, you agree that you have read and accept our
              <a href="#" className="hover:text-blue-400 hover:underline">
                {" "}
                T&Cs{" "}
              </a>
              <span>and</span>{" "}
              <a href="#" className="hover:text-blue-400 hover:underline  ">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
