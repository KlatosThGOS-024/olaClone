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
  vehicleFee,
  vehicleAway,
}: {
  vehicle: RideCreateData["vehicle"];
  pickupLocation: RideCreateData["pickupLocation"];
  destinationLocation: RideCreateData["destinationLocation"];
  vehicleFee: string;
  vehicleAway: string;
}) => {
  try {
    const url = `http://localhost:3000/api/v1/map/get-distance-time?origin=${pickupLocation}&destination=${destinationLocation}`;
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      throw new Error(`Failed to fetch distance and time: ${response.status}`);
    }

    const data: any = await response.json();
    const distanceInMeters = data.data.distance.value;
    const distanceInKm = distanceInMeters / 1000;

    // Convert vehicleFee to a number (assuming it starts with a currency symbol, e.g., ₹)
    const baseFee = parseFloat(vehicleFee.replace(/[^\d.]/g, "")); // Removes non-numeric characters

    // Determine fare per kilometer based on vehicle type
    let farePerKm: number;
    switch (vehicle) {
      case "OlaGo":
        farePerKm = 12; // Example fare for OlaGo
        break;
      case "olaChopper":
        farePerKm = 15; // Example fare for olaChopper
        break;
      case "olaTukTuk":
        farePerKm = 8; // Example fare for olaTukTuk
        break;
      case "olaMoto":
        farePerKm = 5; // Example fare for olaMoto
        break;
      default:
        return "Invalid vehicle type.";
    }

    // Calculate total fare
    const distanceFare = distanceInKm * farePerKm;
    const totalFare = baseFee + distanceFare;

    console.log(`Vehicle is ${vehicleAway}`);
    return Math.round(totalFare);
  } catch (error: any) {
    console.error("Error calculating fare:", error.message);
    return "Failed to calculate fare.";
  }
};

// const calculateFare = async ({
//   vehicle,
//   distance,
//   time,
//   vechilePrice,
// }: {
//   vehicle: RideCreateData["vehicle"];
//   distance: number;
//   time: number;
//   vechilePrice: number;
// }): Promise<number | string> => {
//   try {

//     let farePerKm: number;
//     let timeChargePerMinute: number;

//     switch (vehicle) {
//       case "car":
//         farePerKm = 10;
//         timeChargePerMinute = 2;
//         break;
//       case "bike":
//         farePerKm = 5;
//         timeChargePerMinute = 1;
//         break;
//       case "auto":
//         farePerKm = 8;
//         timeChargePerMinute = 1.5;
//         break;
//       default:
//         return "Invalid vehicle type.";
//     }

//     const distanceFare = distance * farePerKm;
//     const timeFare = time * timeChargePerMinute;
//     const totalFare = vechilePrice + distanceFare + timeFare;

//     return Math.round(totalFare);
//   } catch (error: any) {
//     console.error("Error calculating fare:", error.message);
//     return "Failed to calculate fare.";
//   }
// };

const createRide = asyncHandler(async (req: Request, res: Response) => {
  const rideData = rideCreateSchema.safeParse(req.body);

  if (!rideData.success || !req.user) {
    res
      .status(400)
      .send(new ApiError(400, "Credentails are wrong", rideData.error));
    return;
  }

  //@ts-ignore
  const {
    vehicle,
    pickupLocation,
    destinationLocation,
    vehicleFee,
    vehicleAway,
  } = rideData.data;
  const fare = await calculateFare({
    vehicle,
    pickupLocation,
    destinationLocation,
    vehicleFee,
    vehicleAway,
  });

  const rideCreate = await Ride.create({
    user: req.user._id?.toString(),
    vehicleType: vehicle,
    pickupLocation,
    destinationLocation,
    fare,
  });
  const otp = await rideCreate.generateOTP();
  console.log(otp);
  res.send(new ApiResponse(200, rideCreate, "Successfully craeted the Ride"));
});
const getPendingRideByUser = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user._id?.toString();
    const getRide = await Ride.find({
      user: userId,
      status: "pending",
    });
    res.send(new ApiResponse(200, getRide, "Successfully Get the Ride"));
  }
);
const getPendingRideByCaptain = asyncHandler(
  async (_: Request, res: Response) => {
    console.log("hello");
    const getRide = await Ride.find({
      status: "pending",
    });
    res.send(new ApiResponse(200, getRide, "Successfully Get the Ride"));
  }
);
export { createRide, getPendingRideByUser, getPendingRideByCaptain };
