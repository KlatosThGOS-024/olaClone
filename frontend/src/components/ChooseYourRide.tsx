const data = [
  {
    imgSrc: "../../public/images/olaGo.jpg",
    vechName: "OlaGo",
    description: "Affordable, Compact rides",
    price: "₹193",
    timing: "2 Min aways",
  },
  {
    imgSrc: "../../public/images/olaChopper.png",
    vechName: "olaChopper",
    description: "Not Affordable, Tera Ghar jayega",
    price: "₹100000",
    timing: "1 Min aways",
  },
  {
    imgSrc: "../../public/images/olaTukTuk.png",
    vechName: "olaTukTuk",
    description: "Very Affordable, Compact rides",
    price: "₹193.5",
    timing: "20 Min aways",
  },
  {
    imgSrc: "../../public/images/uberMoto.png",
    vechName: "olaMoto",
    description: "Affordable, MotorCycle rides",
    price: "₹165",
    timing: "7 Min aways",
  },
];
const ChooseYourRide = ({
  panelClose,
  closeRide,
  rideConfirmedFun,
}: {
  panelClose: any;
  closeRide: any;
  rideConfirmedFun: any;
}) => {
  const onClickHandler = () => {
    if (rideConfirmedFun) {
      rideConfirmedFun();
    }
  };
  const closePanel = () => {
    panelClose((value: any) => {
      !value;
    }),
      closeRide((value: any) => {
        !value;
      });
  };
  return (
    <section className="py-3 absolute bottom-0 w-full bg-white rounded-lg">
      <div className=" flex items-center justify-center">
        <img
          onClick={closePanel}
          className=" cursor-pointer w-[42px] "
          src=" ../../public/images/remove.png"
        />
      </div>
      <p className=" bg-[#eee] w-fit rounded-full mx-4  px-[12px] py-[6px] flex gap-2">
        <img className=" w-[20px]" src="../../public/images/clock.png"></img>
        <span className=" font-[500] text-black">Leave now</span>
      </p>
      <div className=" flex flex-col space-y-3 py-3 px-2 mx-[2px]">
        {data.map((value) => (
          <div
            onClick={() => {
              onClickHandler();
            }}
            key={value.imgSrc}
            className=" cursor-pointer border-[3px] border-transparent hover:border-black
         rounded-lg space-x-3 items-center flex "
          >
            <img className="w-[66px]" src={value.imgSrc}></img>
            <div className="flex-grow">
              <p className="text-black font-semibold text-[18px]">
                {value.vechName}
              </p>
              <p>{value.timing}</p>
              <p className="text-gray-400">{value.description}</p>
            </div>
            <p className="text-black font-semibold pr-4">{value.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChooseYourRide;
