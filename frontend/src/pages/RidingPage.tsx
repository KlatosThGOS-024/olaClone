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

export const Riding = () => {
  return (
    <section>
      <div className=" ">
        <img src="../../public\images\carRiding.gif"></img>
      </div>

      <div>
        <div className="flex items-center justify-between mx-2">
          <img className="w-[164px]" src="../../public/images/olaGo.jpg" />
          <div className=" flex flex-col">
            <span className=" text-[28px]">Sarthak Kumar</span>
            <span className=" text-[24px] font-[500]">MP 40 2N WR</span>
            <span className=" text-gray-500">Maruti Suzuki</span>
          </div>
        </div>
        {data.map((value) => (
          <div key={value.fullLocation} className=" mt-[48px] mx-[28px]">
            <div className=" flex space-x-[16px] items-center">
              <img
                src="../../public/images/location.png"
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
                src="../../public/images/monument.png"
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
          </div>
        ))}
      </div>
      <button
        className="  mt-[36px] bg-green-500 px-4 py-3 text-white rounded-lg w-full
      rext-[18px] font-[600]"
      >
        Make Payment
      </button>
    </section>
  );
};
