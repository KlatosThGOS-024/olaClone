import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "./Loader";
import { RideType } from "../assets/Type";

export const OngoingRidePage = ({}) => {
  const [rideInfo, setRideInfo] = useState<RideType[]>([]);

  const { rideId } = useParams();

  const getOngoingRide = async (rideId: string | undefined) => {
    try {
      const token = localStorage.getItem("token");
      const url = `http://localhost:3000/api/v1/ride/ongoing-ride?rideId=${rideId}`;
      const rideResponse = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await rideResponse.json();
      setRideInfo(Array(data.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOngoingRide(rideId);
  }, []);
  if (!rideInfo) {
    return (
      <div>
        {" "}
        <Loader />
      </div>
    );
  }
  return (
    <section className=" w-full">
      <div className="relative w-[440px] mx-auto">
        <div className=" ">
          <img src="/images/carRiding.gif"></img>
        </div>
        <div>
          {rideInfo.map((value) => (
            <div
              key={value.passengerName}
              className="bg-white px-[18px] py-[28px] space-y-3  "
            >
              <div className=" bg-gray-300 px-2 py-3 rounded-xl flex items-center space-x-6 ">
                <img className=" w-[62px]" src="/images/olaDriver.png"></img>
                <div className=" flex flex-col justify-center">
                  <span className=" ml-2 mb-1 text-[18px] font-semibold">
                    {value.passengerName}
                  </span>
                  <p className=" space-x-2">
                    <span className=" font-semibold text-[14px] bg-yellow-400 text-black rounded-full px-[12px] py-[3px]">
                      Apple pay
                    </span>
                    <span className=" bg-yellow-400 text-black font-semibold text-[14px] rounded-full px-[12px] py-[3px]">
                      Cash
                    </span>
                  </p>
                </div>
                <p className="text-[18px] font-semibold">₹ {value.fare}</p>
              </div>
              <div>
                <p className=" text-gray-400 text-[16px]">PickUp Location</p>
                <p className=" text-black font-semibold text-[22px]">
                  {value.pickupLocation}
                </p>
              </div>
              <div>
                <p className=" text-gray-400 text-[16px]">Drop Location</p>
                <p className=" text-black font-semibold text-[22px]">
                  {value.destinationLocation}
                </p>
              </div>
              <p>{value.otp}</p>
            </div>
          ))}
        </div>
        <div className=" px-[48px] flex items-center gap-[28px]">
          <label className=" text-[22px] font-semibold">Enter Otp</label>
          <input
            className=" bg-[#eee] px-2 rounded-lg py-[8px]"
            placeholder="OTP"
          ></input>
        </div>
      </div>
    </section>
  );
};
// updateCaptainRides("ongoing", value._id);
