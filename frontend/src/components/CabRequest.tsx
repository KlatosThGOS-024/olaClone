import { Link } from "react-router-dom";

const data = [
  {
    passengerImg: "../../public/images/olaDriver.png",
    passengerName: "Anya Chan",
    cabPrice: "$192.20",
    pickUpLocation: "7229 Statt Village",
    dropLocation: "105 Willam St, Chicago, Us",
    offers: [{ offer1: "ApplePay", offer2: "Discount" }],
  },
];

export const CabRequest = () => {
  return (
    <section className="  absolute top-0 bg-gray-300 w-full space-y-[18px] ">
      {data.map((value) => (
        <div
          key={value.passengerImg}
          className="bg-white px-[18px] py-[28px] space-y-3  "
        >
          <div className=" bg-gray-300 px-2 py-3 rounded-xl flex items-center space-x-6 ">
            <img className=" w-[62px]" src={value.passengerImg}></img>
            <div className=" flex flex-col justify-center">
              <span className=" ml-2 mb-1 text-[18px] font-semibold">
                {value.passengerName}
              </span>
              <p className=" space-x-2">
                <span className=" font-semibold text-[14px] bg-yellow-400 text-black rounded-full px-[12px] py-[3px]">
                  {value.offers[0].offer1}
                </span>
                <span className=" bg-yellow-400 text-black font-semibold text-[14px] rounded-full px-[12px] py-[3px]">
                  {value.offers[0].offer2}
                </span>
              </p>
            </div>
            <p className=" text-[18px] font-semibold"> {value.cabPrice}</p>
          </div>
          <div className=" ">
            <p className=" text-gray-400 text-[16px]">PickUp Location</p>
            <p className=" text-black font-semibold text-[22px]">
              {value.pickUpLocation}
            </p>
          </div>
          <div>
            <p className=" text-gray-400 text-[16px]">Drop Location</p>
            <p className=" text-black font-semibold text-[22px]">
              {value.dropLocation}
            </p>
          </div>
          <div className=" space-y-3">
            <Link to={"/captain/ride"}>
              {" "}
              <button
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
