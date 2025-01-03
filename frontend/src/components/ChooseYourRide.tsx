import { vechileType } from "../assets/constants";
import { VehicleDetails } from "../assets/Type";

const ChooseYourRide = ({
  panelClose,
  closeRide,
  rideConfirmedFun,
  setvehicleDetails,
}: {
  panelClose: React.Dispatch<React.SetStateAction<boolean>>;
  closeRide: React.Dispatch<React.SetStateAction<boolean>>;
  rideConfirmedFun: () => void;
  setvehicleDetails: React.Dispatch<React.SetStateAction<VehicleDetails>>;
}) => {
  const onClickHandler = () => {
    if (rideConfirmedFun) {
      rideConfirmedFun();
    }
  };
  const closePanel = () => {
    panelClose((value: boolean) => {
      return !value;
    }),
      closeRide((value: boolean) => {
        return !value;
      });
  };
  return (
    <section className="py-3 absolute bottom-0 w-full bg-white rounded-lg">
      <div className=" flex items-center justify-center">
        <img
          onClick={closePanel}
          className=" cursor-pointer w-[42px] "
          src=" /images/remove.png"
        />
      </div>
      <p className=" bg-[#eee] w-fit rounded-full mx-4  px-[12px] py-[6px] flex gap-2">
        <img className=" w-[20px]" src="/images/clock.png"></img>
        <span className=" font-[500] text-black">Leave now</span>
      </p>
      <div className=" flex flex-col space-y-3 py-3 px-2 mx-[2px]">
        {vechileType.map((value) => (
          <div
            onClick={() => {
              setvehicleDetails({
                vehicleName: value.vechName,
                vehicleFee: value.price,
                vehicleAway: value.timing,
              });
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
