import { useEffect, useState } from "react";
import { socket } from "../App";
// Sare35@gjh
type RideType = {
  pickupLocation: string;
  destinationLocation: string;
  fare: string;
  user: string;
  _id: string;
  status: string;
};

export const Riding = () => {
  const [rideDetails, setRideDetials] = useState<RideType | null>(null);
  const [rideAccepted, setRideAccepted] = useState(false);

  useEffect(() => {
    socket.on("ride-accepted", () => {
      setRideAccepted((prevState) => !prevState);
    });

    // Clean up event listener when the component unmounts
    return () => {
      socket.off("ride-accepted");
    };
  }, []);

  const getPendingRide = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `http://localhost:3000/api/v1/ride/user-ride/pending`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        setRideDetials(data.data[0]);
      } else {
        console.warn("No pending ride found.");
      }
    } catch (error) {
      console.error("Error fetching ride details:", error);
    }
  };

  useEffect(() => {
    getPendingRide();
  }, []);

  if (!rideAccepted) {
    return <div>No ride accepted. Please wait...</div>;
  }

  if (!rideDetails) {
    return <div>Loading ride details...</div>;
  }

  return (
    <section className=" w-full">
      <div className="w-[440px] rounded-lg mx-auto relative">
        <div className="  ">
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
                    {rideDetails?.pickupLocation}
                  </span>
                  <span className="text-gray-700 text-[17px]">
                    {rideDetails?.pickupLocation}
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
                    {rideDetails?.destinationLocation}
                  </span>
                  <span className="text-gray-700 text-[17px]">
                    {rideDetails?.destinationLocation}
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
                  <span className="font-[600] text-[20px]">{` ₹${rideDetails?.fare}`}</span>
                  <span className="text-gray-700 text-[17px]">Cash Cash</span>
                </p>
              </div>
            </div>
          </div>
          <button
            className="mt-[36px] hover:bg-green-400
           bg-green-500 px-4 py-3 text-white rounded-lg w-full text-[18px] font-[600]"
          >
            Make Payment
          </button>
        </div>
      </div>
    </section>
  );
};
