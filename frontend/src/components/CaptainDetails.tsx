import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Loader } from "./Loader";
import { CaptainProfile } from "../assets/Type";

export const CaptainDetails = ({
  closedUserDetailPanel,
  openUserDetails,
}: {
  closedUserDetailPanel: boolean;
  openUserDetails: () => void;
}) => {
  const [captainData, setCaptainData] = useState<CaptainProfile[]>([]);
  const getCaptainProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `http://localhost:3000/api/v1/captain/profile`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data.data);
      setCaptainData(Array(data.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCaptainProfile();
  }, []);

  if (captainData.length <= 0) {
    return <Loader />;
  }
  return (
    <section className=" w-full ">
      <div className="w-[440px] mx-auto ">
        <div className="relative ">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: !closedUserDetailPanel ? 0 : 600 }}
            transition={{ duration: 0.6 }}
          >
            {captainData.map((value) => (
              <div
                key={value.email}
                className=" w-full bg-white
                absolute bottom-0"
              >
                <div
                  className=" rounded-xl flex items-center 
                justify-center"
                >
                  <img
                    onClick={() => openUserDetails()}
                    className=" cursor-pointer w-[42px] "
                    src=" /images/remove.png"
                  />
                </div>
                <div className=" w-full flex items-center justify-between">
                  <div className=" flex items-center gap-[28px]">
                    <p className=" bg-green-400  rounded-full">
                      <img
                        className=" w-[87px]"
                        src="/images/olaDriver.png"
                      ></img>
                    </p>
                    <div>
                      <span className=" block font-semibold text-[28px]">
                        {value.firstName}
                        {value.lastName}
                      </span>
                      <span className=" text-gray-400">Basic Level</span>
                    </div>
                  </div>
                  <span className=" font-[700]  text-[22px]">$245.22</span>
                </div>
                <div className=" grid grid-cols-3 px-[18px] my-[28px] items-center justify-between">
                  <div className=" flex flex-col items-center">
                    <img
                      className=" w-[42px]"
                      src="/images/clock_2725210.png"
                    ></img>
                    <span className=" text-[18px] ">10.2</span>
                    <span className=" text-gray-500">HOUR ONLINE</span>
                  </div>
                  <div className=" flex flex-col items-center">
                    <img
                      className=" w-[42px]"
                      src="/images/speedometer.png"
                    ></img>
                    <span className=" text-[18px] ">100.2km</span>
                    <span className=" text-gray-500">TOTAL DISTANCE</span>
                  </div>
                  <div className=" flex flex-col items-center">
                    <img className=" w-[42px]" src="/images/suitcase.png"></img>
                    <span className=" block text-[18px] ">45</span>
                    <span className=" text-gray-500">JOBS DONE</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
