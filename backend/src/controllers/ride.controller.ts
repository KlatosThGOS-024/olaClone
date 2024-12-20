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

const createRide = asyncHandler(async (req: Request, res: Response) => {
  const rideData = rideCreateSchema.safeParse(req.body);
  const user = req.user;
  if (!rideData.success || !req.user) {
    res
      .status(400)
      .send(new ApiError(400, "Credentails are wrong", rideData.error));
    return;
  }

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
    passengerName: user.firstName + " " + user.lastName,
    passengerImage: user.firstName,
    userId: user._id,
  });
  const otp = await rideCreate.generateOTP();
  console.log(otp);
  res.send(new ApiResponse(200, rideCreate, "Successfully craeted the Ride"));
});
const getPendingRideByUser = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user._id?.toString();
    console.log(userId);
    const getRide = await Ride.find({
      status: "pending",
    });
    res
      .status(200)
      .send(new ApiResponse(200, getRide, "Successfully Get the Ride"));
  }
);

const getOngoingRide = asyncHandler(async (req: Request, res: Response) => {
  const { rideId } = req.query;
  if (!rideId) {
    res
      .status(400)
      .send(new ApiError(400, "Error while getting the rideId", rideId));
  }

  const getRide = await Ride.findById(rideId);
  if (!getRide) {
    res
      .status(400)
      .send(new ApiError(400, "Error while getting the Ride", getRide));
  }
  res.send(new ApiResponse(200, getRide, "Successfully Get the Ride"));
});
const getPendingRideByCaptain = asyncHandler(
  async (_: Request, res: Response) => {
    const getRide = await Ride.find({
      status: "pending",
    });
    res.send(new ApiResponse(200, getRide, "Successfully Get the Ride"));
  }
);
const getCurrentRide = asyncHandler(async (req: Request, res: Response) => {
  const { rideId } = req.query;

  const getRide = await Ride.findById(rideId);
  res.send(new ApiResponse(200, getRide, "Successfully Get the Ride"));
});

export {
  createRide,
  getPendingRideByUser,
  getPendingRideByCaptain,
  getOngoingRide,
  getCurrentRide,
};
