import Ride from "../models/ride.models";
import { rideCreateSchema, RideCreateData } from "../types/ride.types";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import { Request, Response } from "express";

const calculateFare = async ({
  vehicle,
  pickupLocation,
  destinationLocation,
}: {
  vehicle: RideCreateData["vehicle"];
  pickupLocation: RideCreateData["pickupLocation"];
  destinationLocation: RideCreateData["destinationLocation"];
}) => {
  try {
    const url = `http://localhost:3000/api/v1/map/get-distance-time?origin=${pickupLocation}&destination=${destinationLocation}`;
    const response = await fetch(url, { method: "GET" });

    const data: any = await response.json();
    const distanceInMeters = data.data.distance.value;

    const distanceInKm = distanceInMeters / 1000;
    let farePerKm: number;
    switch (vehicle) {
      case "car":
        farePerKm = 10;
        break;
      case "bike":
        farePerKm = 5;
        break;
      case "auto":
        farePerKm = 8;
        break;
      default:
        return "Invalid vehicle type.";
    }

    const totalFare = distanceInKm * farePerKm;

    return Math.round(totalFare);
  } catch (error: any) {
    console.error("Error calculating fare:", error.message);
    return "Failed to calculate fare.";
  }
};

const createRide = asyncHandler(async (req: Request, res: Response) => {
  const rideData = rideCreateSchema.safeParse(req.body);

  if (!rideData.success || !req.user) {
    res
      .status(400)
      .send(new ApiError(400, "Credentails are wrong", rideData.error));
    return;
  }

  //@ts-ignore
  const { vehicle, pickupLocation, destinationLocation } = rideData.data;
  const fare = await calculateFare({
    vehicle,
    pickupLocation,
    destinationLocation,
  });

  const rideCreate = await Ride.create({
    user: req.user._id?.toString(),
    vehicle,
    pickupLocation,
    destinationLocation,
    fare,
  });
  const otp = await rideCreate.generateOTP();
  console.log(otp);
  res.send(new ApiResponse(200, rideCreate, "Successfully craeted the Ride"));
});
export default createRide;
