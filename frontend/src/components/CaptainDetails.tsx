import { motion } from "framer-motion";
import { useState } from "react";
export const CaptainDetails = () => {
  const [closedUserDetailPanel, setClosedUserDetailPanel] = useState(false);
  return (
    <section>
      <p className=" absolute top-0 right-0 px-3 py-2 my-[28px] bg-black rounded-full">
        <img
          onClick={() => setClosedUserDetailPanel(!closedUserDetailPanel)}
          className=" cursor-pointer w-[96px]"
          src="../../public/images/captainImg.jpg"
        ></img>
      </p>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: !closedUserDetailPanel ? 0 : 600 }}
        transition={{ duration: 0.6 }}
      >
        <div className=" px-[16px] bg-white w-full absolute bottom-0">
          <div className=" rounded-xl px-3 flex items-center justify-center">
            <img
              onClick={() => setClosedUserDetailPanel(!closedUserDetailPanel)}
              className=" cursor-pointer w-[42px] "
              src=" ../../public/images/remove.png"
            />
          </div>
          <div className=" px-[22px] flex items-center justify-between">
            <div className=" flex items-center gap-[28px]">
              <img
                className=" w-[96px]"
                src="../../public/images/captainImg.jpg"
              ></img>
              <div>
                <span className=" block font-semibold text-[28px]">
                  Harsh Bhai
                </span>
                <span className=" text-gray-400">Basic Level</span>
              </div>
            </div>
            <span className=" font-[700] text-[22px]">$245.22</span>
          </div>
          <div className=" grid grid-cols-3 px-[18px] my-[28px] items-center justify-between">
            <div className=" flex flex-col items-center">
              <img
                className=" w-[68px]"
                src="../../public/images/clock_2725210.png"
              ></img>
              <span className=" text-[28px] ">10.2</span>
              <span className=" text-gray-500">HOUR ONLINE</span>
            </div>
            <div className=" flex flex-col items-center">
              <img
                className=" w-[68px]"
                src="../../public/images/speedometer.png"
              ></img>
              <span className=" text-[28px] ">100.2km</span>
              <span className=" text-gray-500">TOTAL DISTANCE</span>
            </div>
            <div className=" flex flex-col items-center">
              <img
                className=" w-[68px]"
                src="../../public/images/suitcase.png"
              ></img>
              <span className=" block text-[28px] ">45</span>
              <span className=" text-gray-500">JOBS DONE</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
