import { motion } from "framer-motion";

export const CaptainDetails = ({
  closedUserDetailPanel,
  openUserDetails,
}: {
  closedUserDetailPanel: boolean;
  openUserDetails: () => void;
}) => {
  return (
    <section>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: !closedUserDetailPanel ? 0 : 600 }}
        transition={{ duration: 0.6 }}
      >
        <div className=" px-[16px] bg-white w-full absolute bottom-0">
          <div className=" rounded-xl px-3 flex items-center justify-center">
            <img
              onClick={() => openUserDetails()}
              className=" cursor-pointer w-[42px] "
              src=" /images/remove.png"
            />
          </div>
          <div className=" px-[22px] flex items-center justify-between">
            <div className=" flex items-center gap-[28px]">
              <p className=" bg-green-400  rounded-full">
                {" "}
                <img className=" w-[87px]" src="/images/olaDriver.png"></img>
              </p>
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
              <img className=" w-[42px]" src="/images/clock_2725210.png"></img>
              <span className=" text-[18px] ">10.2</span>
              <span className=" text-gray-500">HOUR ONLINE</span>
            </div>
            <div className=" flex flex-col items-center">
              <img className=" w-[42px]" src="/images/speedometer.png"></img>
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
      </motion.div>
    </section>
  );
};
