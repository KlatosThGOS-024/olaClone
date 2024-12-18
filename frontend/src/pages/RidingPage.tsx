import { useEffect, useRef, useState } from "react";
import { socket } from "../App";
type RideType = {
  pickupLocation: string;
  destinationLocation: string;
  fare: string;
  user: string;
  _id: string;
  status: string;
};

export const Riding = () => {
  const [rideDetails, setRideDetials] = useState<RideType>();
  const [rideAccepted, setsetIsloading] = useState(false);
  const value = useRef(rideDetails);
  useEffect(() => {
    if (value.current != rideDetails) {
      console.log("A ride has been initiated", rideDetails);
      socket.emit("ride-requested", rideDetails);
    }
  }, [rideDetails]);
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
      console.error("Error", error);
    }
  };

  useEffect(() => {
    getPendingRide();
  }, []);

  return (
    <section>
      hello
      {/* <div className=" ">
        <img src="../../public\images\carRiding.gif"></img>
      </div>

      <div>
        <div className=" mt-[18px] mx-[28px]">
          <div className=" flex space-x-[16px] items-center">
            <img
              src="../../public/images/location.png"
              className=" w-[28px] h-[28px]"
            ></img>
            <p className=" flex flex-col">
              <span className=" font-[600] text-[20px]">
                {rideDetails?.pickupLocation}
              </span>
              <span className=" text-gray-700 text-[17px]">
                {rideDetails?.pickupLocation}
              </span>
            </p>
          </div>
          <hr></hr>
          <div className=" flex space-x-[16px] items-center">
            <img
              src="../../public/images/monument.png"
              className=" w-[28px] h-[28px]"
            ></img>
            <p className=" flex flex-col">
              <span className=" font-[600] text-[20px]">
                {" "}
                {rideDetails?.destinationLocation}
              </span>
              <span className=" text-gray-700 text-[17px]">
                {rideDetails?.destinationLocation}
              </span>
            </p>
          </div>
          <hr></hr>
          <div className=" flex space-x-[16px] items-center">
            <img
              src="../../public/images/money.png"
              className=" w-[28px] h-[28px]"
            ></img>
            <p className=" flex flex-col">
              <span className=" font-[600] text-[20px]">
                {` ₹${rideDetails?.fare}`}
              </span>
              <span className=" text-gray-700 text-[17px]">Cash Cash</span>
            </p>
          </div>
        </div>
      </div>
      <button
        className="  mt-[36px] bg-green-500 px-4 py-3 text-white rounded-lg w-full
      rext-[18px] font-[600]"
      >
        Make Payment
      </button> */}
    </section>
  );
};

// interface RideType {
//   pickupLocation:string,
//   destinationLocation:string,
//   fare:string,
//   user:string,
//   _id:string,
//   status:string
// }

// export const Riding = () => {
//   const [rideDetails, setRideDetials] = useState<RideType>({
//     pickupLocation:"",
//     destinationLocation:"",
//     fare:"",
//     user:"",
//     _id:"",
//     status:""
//   });
//   const getPendingRide = async () => {
//     const token = localStorage.getItem("token");
//     const url = `http://localhost:3000/api/v1/ride/user-ride/pending`;
//     const response = await fetch(url, {
//       method: "GET",

//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const data = await response.json();
//     setRideDetials({
//       pickupLocation:data.data[0].pickupLocation,
//       destinationLocation:data.data[0].destinationLocation,
//       fare:data.data[0].fare,
//       user:data.data[0].user,
//       _id:data.data[0]._id,
//       status:data.data[0].status
//     })

//   };
//   useEffect(() => {
//     getPendingRide()
//   }, []);
//   return (
//     <section>
//       <div className=" ">
//         <img src="../../public\images\carRiding.gif"></img>
//       </div>

//       <div>
//         <div className="flex items-center justify-between mx-2">
//           <img className="w-[164px]" src="../../public/images/olaGo.jpg" />
//           <div className=" flex flex-col">
//             <span className=" text-[28px]">Sarthak Kumar</span>
//             <span className=" text-[24px] font-[500]">MP 40 2N WR</span>
//             <span className=" text-gray-500">Maruti Suzuki</span>
//           </div>
//         </div>

//           <div className=" mt-[48px] mx-[28px]">
//             <div className=" flex space-x-[16px] items-center">
//               <img
//                 src="../../public/images/location.png"
//                 className=" w-[28px] h-[28px]"
//               ></img>
//               <p className=" flex flex-col">
//                 <span className=" font-[600] text-[20px]">{RideType.pickupLocation}</span>
//                 <span className=" text-gray-700 text-[17px]">
//                 RideType' only refers to a type, but is being used as a value here.   {value.loction}
//                 </span>
//               </p>
//             </div>
//             <hr></hr>
//             <div className=" flex space-x-[16px] items-center">
//               <img
//                 src="../../public/images/monument.png"
//                 className=" w-[28px] h-[28px]"
//               ></img>
//               <p className=" flex flex-col">
//                 <span className=" font-[600] text-[20px]">
//                   {" "}
//                   {value.landmark}
//                 </span>
//                 <span className=" text-gray-700 text-[17px]">
//                   {value.fullLocation}
//                 </span>
//               </p>
//             </div>
//             <hr></hr>
//           </div>
//         ))}
//       </div>
//       <button
//         className="  mt-[36px] bg-green-500 px-4 py-3 text-white rounded-lg w-full
//       rext-[18px] font-[600]"
//       >
//         Make Payment
//       </button>
//     </section>
//   );
// };
