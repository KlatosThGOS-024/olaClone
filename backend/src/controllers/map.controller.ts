import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";

const getCoordinates = asyncHandler(async (req: Request, res: Response) => {
  const address = req.query.address as string;

  if (!address) {
    const res2 = new ApiError(404, "Address query parameter is required.");
    res.status(400).send(res2);
    return;
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=AIzaSyA2kNS0EWbSA4vG2C0WNL9k_qfxFLn-ImE`;

  const response = await fetch(url, { method: "GET" });
  const data = await response.json();
  const location = data.results[0].geometry.location;
  if (!response.ok) {
    res
      .status(response.status)
      .send(new ApiError(400, "Un Successfull the location lat/long", []));
    return;
  }

  res
    .status(200)
    .send(
      new ApiResponse(
        200,
        location,
        "Successfully retrevied the location lat/long"
      )
    );
});

export { getCoordinates };
