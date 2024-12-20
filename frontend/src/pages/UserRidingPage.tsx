import { useEffect, useState } from "react";
import { socket } from "../App";
import { Loader } from "../components/Loader";
import { RideType } from "../assets/Type";
import { useLocation } from "react-router-dom";

export const UserRideComingPage = () => {
  const [rideDetails, setRideDetails] = useState<RideType[]>([]);
  const [rideAccepted, setRideAccepted] = useState(false);
  const location = useLocation();
  const pathParts = location.pathname.split("/user/ride/");
  const rideId = pathParts[pathParts.length - 1];

  useEffect(() => {
    socket.on("ride-accepted", () => {
      setRideAccepted((prevState) => !prevState);
    });

    return () => {
      socket.off("ride-accepted");
    };
  }, []);

  useEffect(() => {
    getCurrentRide();
  }, []);

  const getCurrentRide = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `http://localhost:3000/api/v1/ride/user-ride/current?rideId=${rideId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      console.log("Ride data fetched:", data);

      setRideDetails(Array(data.data) || []);
    } catch (error) {
      console.error("Error fetching ride details:", error);
    }
  };
  useEffect(() => {
    console.log("Current ride details:", rideDetails);
  }, [rideDetails]);

  if (!rideAccepted) {
    return (
      <div>
        <Loader />
        <p>No ride accepted. Please wait...</p>
      </div>
    );
  }

  if (rideDetails.length === 0) {
    return (
      <div>
        <Loader />
        <p>Loading ride details...</p>
      </div>
    );
  }

  const [ride] = rideDetails;

  return (
    <section className="w-full">
      <div className="w-[440px] rounded-lg mx-auto relative">
        <div>
          <img
            className="w-[550px]"
            src="/images/carRiding.gif"
            alt="Car Riding"
          />

          <div>
            <div className="mt-[18px] mx-[28px]">
              <div className="flex space-x-[16px] items-center">
                <img
                  src="/images/location.png"
                  className="w-[28px] h-[28px]"
                  alt="Pickup Location"
                />
                <p className="flex flex-col">
                  <span className="font-[600] text-[20px]">
                    {ride?.destinationLocation || "N/A"}
                  </span>
                  <span className="text-gray-700 text-[17px]">
                    {ride?.destinationLocation || "N/A"}
                  </span>
                </p>
              </div>
              <hr />
              <div className="flex space-x-[16px] items-center">
                <img
                  src="/images/monument.png"
                  className="w-[28px] h-[28px]"
                  alt="Destination Location"
                />
                <p className="flex flex-col">
                  <span className="font-[600] text-[20px]">
                    {ride?.pickupLocation || "N/A"}
                  </span>
                  <span className="text-gray-700 text-[17px]">
                    {ride?.pickupLocation || "N/A"}
                  </span>
                </p>
              </div>
              <hr />
              <div className="flex space-x-[16px] items-center">
                <img
                  src="/images/money.png"
                  className="w-[28px] h-[28px]"
                  alt="Fare"
                />
                <p className="flex flex-col">
                  <span className="font-[600] text-[20px]">{` ₹${
                    ride?.fare || 0
                  }`}</span>
                  <span className="text-gray-700 text-[17px]">Cash Cash</span>
                  <span>{ride?.otp || "N/A"}</span>
                </p>
              </div>
            </div>
          </div>
          <button className="mt-[36px] hover:bg-green-400 bg-green-500 px-4 py-3 text-white rounded-lg w-full text-[18px] font-[600]">
            Make Payment
          </button>
        </div>
      </div>
    </section>
  );
};
