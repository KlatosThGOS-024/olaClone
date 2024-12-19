import { useEffect, useState } from "react";
import { socket } from "../App";
import { Link } from "react-router-dom";
import { SecondRideType } from "../assets/Type";

export const CabRequest = () => {
  var [rideDetails, setRideDetails] = useState<SecondRideType[]>([]);

  useEffect(() => {
    getRides();
  }, [rideDetails]);

  socket.on("ride-requested", (message) => {
    setRideDetails((prevRideDetails) => {
      return [...prevRideDetails, message];
    });

    setRideDetails((rideDetails) => {
      return (rideDetails = Array.from(
        new Map(rideDetails.map((item) => [item._id, item])).values()
      ));
    });

    return () => {
      socket.off("ride-requested");
    };
  });

  const getRides = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `http://localhost:3000/api/v1/ride/captain-ride/pending`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        setRideDetails((prevRideDetails) => [...prevRideDetails, ...data.data]);
        setRideDetails((rideDetails) => {
          return (rideDetails = Array.from(
            new Map(rideDetails.map((item) => [item._id, item])).values()
          ));
        });
      }
    } catch (error) {
      console.error("Error", error);
    }
  };
  const data = { offers: [{ offer1: "ApplePay", offer2: "Discount" }] };
  return (
    <section className="  absolute top-0 bg-gray-300 w-full space-y-[18px] ">
      {rideDetails.map((value: SecondRideType) => (
        <div
          key={value._id}
          className="bg-white px-[18px] py-[28px] space-y-3  "
        >
          <div className=" bg-gray-300 px-2 py-3 rounded-xl flex items-center space-x-6 ">
            <img className=" w-[62px]" src={"/images/olaDriver.png"}></img>
            <div className=" flex flex-col justify-center">
              <span className=" ml-2 mb-1 text-[18px] font-semibold">
                {value.passengerName}
              </span>
              <p className=" space-x-2">
                <span className=" font-semibold text-[14px] bg-yellow-400 text-black rounded-full px-[12px] py-[3px]">
                  {data.offers[0].offer1}
                </span>
                <span className=" bg-yellow-400 text-black font-semibold text-[14px] rounded-full px-[12px] py-[3px]">
                  {data.offers[0].offer2}
                </span>
              </p>
            </div>
            <p className=" text-[18px] font-semibold"> {}</p>
          </div>
          <div className=" ">
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
          <div className=" space-y-3">
            <Link to={`/captain/ride/${value._id}`}>
              <button
                onClick={() => {
                  socket.emit("ride-accepted", "Hello");
                }}
                className=" bg-yellow-400 px-4 py-3
             text-black font-semibold rounded-xl w-full
      rext-[24px] "
              >
                Confirm
              </button>
            </Link>
            <button
              className=" bg-red-600 px-4 py-3
             text-black font-semibold rounded-xl w-full
      rext-[24px] "
            >
              Cancel
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};
