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
const NearbyDriver = () => {
  return (
    <section className=" px-3 py-[16px] absolute space-y-5 bottom-0 bg-white">
      <p className=" text-[22px] text-black font-[600]">Driver In On The Way</p>
      <hr></hr>
      <div>
        {data.map((value) => (
          <div key={value.fullLocation} className=" mx-[28px]">
            <div className=" flex space-x-[16px] items-center">
              <img
                src="/images/location.png"
                className=" w-[28px] h-[28px]"
              ></img>
              <p className=" flex flex-col">
                <span className=" font-[600] text-[20px]">{value.address}</span>
                <span className=" text-gray-700 text-[17px]">
                  {value.loction}
                </span>
              </p>
            </div>
            <hr></hr>
            <div className=" flex space-x-[16px] items-center">
              <img
                src="/images/monument.png"
                className=" w-[28px] h-[28px]"
              ></img>
              <p className=" flex flex-col">
                <span className=" font-[600] text-[20px]">
                  {" "}
                  {value.landmark}
                </span>
                <span className=" text-gray-700 text-[17px]">
                  {value.fullLocation}
                </span>
              </p>
            </div>
            <hr></hr>
            <div className=" flex space-x-[16px] items-center">
              <img src="/images/money.png" className=" w-[28px] h-[28px]"></img>
              <p className=" flex flex-col">
                <span className=" font-[600] text-[20px]">{value.price}</span>
                <span className=" text-gray-700 text-[17px]">Cash Cash</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NearbyDriver;
