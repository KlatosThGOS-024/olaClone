import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../App";
type RideType = {
  pickupLocation: string;
  destinationLocation: string;
  fare: string;
  user: string;
  _id: string;
  status: string;
};

export const ConfirmYourRide = ({
  backHome,
  origin,
  destination,
  handleClick,
}: any) => {
  const [rideConfirmed, setRideConfirmed] = useState(false);
  const [rideAccepted, setRideAccepted] = useState(false);
  const [rideDetails, setRideDetials] = useState<RideType>();
  const value = useRef(rideConfirmed);
  useEffect(() => {
    if (value.current != rideConfirmed) {
      console.log("A ride has been initiated", rideDetails);
      socket.emit("ride-requested", rideDetails);
      socket.on("ride-accepted", (message) => {
        setRideAccepted(() => {
          return !rideAccepted;
        });
      });
    }
  }, [rideAccepted]);

  const navigate = useNavigate();
  return (
    <section className=" px-3 py-[16px] absolute space-y-5 bottom-0 w-full bg-white">
      <div className=" flex items-center justify-center">
        <img
          onClick={() => backHome()}
          className=" cursor-pointer w-[42px] "
          src=" ../../public/images/remove.png"
        />
      </div>
      <p className=" text-[22px] text-black font-[600]">Confirm Your Ride</p>

      <div className=" justify-center flex">
        <img
          src="../../public/images/carComing.png"
          className="w-[128px] h-[96px] "
        ></img>
      </div>
      <hr></hr>
      <div className="">
        <div className=" mx-[28px]">
          <div className=" flex space-x-[16px] items-center">
            <img
              src="../../public/images/location.png"
              className=" w-[28px] h-[28px]"
            ></img>
            <p className=" flex flex-col">
              <span className=" font-[600] text-[20px]">{origin}</span>
              <span className=" text-gray-700 text-[17px]">{origin}</span>
            </p>
          </div>
          <hr></hr>
          <div className=" flex space-x-[16px] items-center">
            <img
              src="../../public/images/monument.png"
              className=" w-[28px] h-[28px]"
            ></img>
            <p className=" flex flex-col">
              <span className=" font-[600] text-[20px]"> {destination}</span>
              <span className=" text-gray-700 text-[17px]"> {destination}</span>
            </p>
          </div>
          <hr></hr>
          <div className=" flex space-x-[16px] items-center">
            <img
              src="../../public/images/money.png"
              className=" w-[28px] h-[28px]"
            ></img>
            <p className=" flex flex-col">
              <span className=" font-[600] text-[20px]">193.20</span>
              <span className=" text-gray-700 text-[17px]">Cash Cash</span>
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          setRideConfirmed(() => {
            return !rideConfirmed;
          });
          handleClick();
          navigate("/user/ride");
        }}
        className=" bg-green-500 px-4 py-3 text-white rounded-lg w-full
      rext-[18px] font-[600]"
      >
        Confirm
      </button>
    </section>
  );
};
