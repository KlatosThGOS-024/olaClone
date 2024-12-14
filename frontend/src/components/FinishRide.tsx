const data = [
  {
    address: "562/11-A",
    loction: "Kaikondrahalli, Bengaluru, Karnataka",
    fullLocation:
      "Kaikondrahalli, Bengaluru, KarnatakaKaikondrahalli, Bengaluru, Karnataka",
    landmark: "Third Wave Coffee",
    price: "193.20",
  },
];
const data3 = [
  {
    passengerImg: "../../public/images/olaDriver.png",
    passengerName: "Anya Chan",
    cabPrice: "$192.20",
    pickUpLocation: "7229 Statt Village",
    dropLocation: "105 Willam St, Chicago, Us",
    offers: [{ offer1: "ApplePay", offer2: "Discount" }],
  },
];
export const FinishRide = () => {
  return (
    <section>
      <div className=" ">
        <img src="../../public\images\carRiding.gif"></img>
      </div>

      <div>
        {data3.map((value) => (
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
    </section>
  );
};
