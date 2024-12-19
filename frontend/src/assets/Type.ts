export type FirstRideType = {
  pickupLocation: string;
  destinationLocation: string;
  fare: string;
  user: string;
  _id: string;
  status: string;
};
export type SecondRideType = {
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
