export type RideType = {
  pickupLocation: string;
  destinationLocation: string;
  fare: string;
  user: string;
  _id: string;
  status: string;
  userId?: string;
  passengerName: string;
  passengerImage: string;
  username: string;
  otp?: string;
};
export type VehicleDetails = {
  vehicleName: string;
  vehicleFee: string;
  vehicleAway: string;
};
export type RideDetails = {
  userId: string;
  passengerName: string;
  passengerImage: string;
  pickupLocation: string;
  destinationLocation: string;
  fare: number;
  status: "pending" | "completed" | "cancelled";
  vehicleType: string;
  _id: string;
  __v: number;
};
export type CaptainProfile = {
  email: string;
  firstName: string;
  lastName: string;
  location: {
    lat: number;
    long: number;
  };
  rides: {
    cancelled: string[];
    ongoing: string[];
    completed: string[];
  };
  status: string;
  username: string;
  vehicle: {
    color: string;
    plate: string;
    capacity: number;
    vehicleType: string;
  };
};
// type RideType = {
//   pickupLocation: string;
//   destinationLocation: string;
//   fare: string;
//   user: string;
//   _id: string;
//   status: string;
//   userId?: string;
//   passengerName: string;
//   passengerImage: string;
//   username: string;
// };
