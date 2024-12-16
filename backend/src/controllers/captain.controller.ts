import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";
import Captain from "../models/captain.models";
import {
  captainCreateSchema,
  captainLoginSchema,
  ICaptain,
} from "../types/captain.types";
import User from "../models/user.models";
const generateAccessToken = async (captain: ICaptain) => {
  const accessToken = await captain.generateAccessTokenMethod();
  return accessToken;
};
const captainCreate = asyncHandler(async (req: Request, res: Response) => {
  const captainData = captainCreateSchema.safeParse(req.body);
  if (!captainData.success) {
    res
      .status(402)
      .send(
        new ApiError(
          400,
          "Credentials are wrong",
          captainData.error,
          [],
          "Validation error occurred"
        )
      );
    return;
  }
  const captainExisted = await Captain.find({
    username: captainData?.data.username,
  });

  if (captainExisted.length) {
    const resData = new ApiError(
      400,
      "Error the user with this username already existed"
    );
    res.status(400).send(resData);
    return;
  }
  const captain = await Captain.create({
    username: captainData?.data.username,
    firstName: captainData?.data.firstName,
    lastName: captainData?.data.lastName,
    password: captainData?.data.password,
    email: captainData?.data.email,
    vehicle: {
      plate: captainData?.data.vehicle.plate,
      color: captainData?.data.vehicle.color,
      capacity: captainData?.data.vehicle.capacity,
      vehicleType: captainData?.data.vehicle.vehicleType,
    },
    location: {
      lat: captainData?.data.location.lat,
      long: captainData?.data.location.long,
    },
  });
  res.send(new ApiResponse(200, captain, "Successfully craeted the account"));
});
const captainLogin = asyncHandler(async (req: Request, res: Response) => {
  const captainData = captainLoginSchema.safeParse(req.body);
  if (!captainData.success) {
    res.send(
      new ApiError(
        400,
        "Credentails are wrong",
        captainData.error,
        [],
        "Validation error occurred"
      )
    );
    return;
  }
  const captainExisted = await Captain.findOne({
    username: captainData?.data.username,
  });
  if (!captainExisted) {
    res
      .status(400)
      .send(
        new ApiError(400, "Error the user with this username doesn't existed")
      );
    return;
  }
  captainExisted.status = "active";
  const passwordComp = await captainExisted.comparePassword(
    captainData?.data.password
  );
  if (!passwordComp) {
    res.send(new ApiError(400, "Credentails are wrong"));
    return;
  }
  const accessToken = await generateAccessToken(captainExisted);
  captainExisted.accessToken = accessToken;
  res
    .cookie("accessToken", accessToken)
    .send(new ApiResponse(200, captainExisted, "Successfully login"));
});
const captainProfile = asyncHandler(async (req: Request, res: Response) => {
  const captain = req.captain;
  res
    .status(200)
    .send(new ApiResponse(200, captain, "User Profile Successfully retrevied"));
});
const userProfileFromCaptain = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.body;
    const userProfile = await User.findById({ userId }).select("-password");
    res
      .status(200)
      .send(
        new ApiResponse(200, userProfile, "User Profile Successfully retrevied")
      );
  }
);
const captainLogout = asyncHandler(async (req: Request, res: Response) => {
  const captain = req.captain;
  captain.status = "inactive";
  res
    .clearCookie("accessToken")
    .status(200)
    .send(new ApiResponse(200, captain, "Successfully Logout"));
});

export {
  captainCreate,
  captainLogin,
  captainLogout,
  captainProfile,
  userProfileFromCaptain,
};
