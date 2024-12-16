import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
interface Prediction {
  description: string;
  place_id: string;
  reference: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
  terms: Array<{ offset: number; value: string }>;
}
const getCoordinates = asyncHandler(async (req: Request, res: Response) => {
  const address = req.query.address as string;

  if (!address) {
    const response = new ApiError(404, "Address query parameter is required.");
    res.status(400).send(response);
    return;
  }
  const apikey = process.env.googleApiKey;

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apikey}`;

  const response = await fetch(url, { method: "GET" });
  const data = await response.json();

  if (!response.ok || data.results.length === 0) {
    res
      .status(response.status)
      .send(
        new ApiError(
          400,
          "Unsuccessful in retrieving the location lat/long",
          []
        )
      );
    return;
  }

  const location = data.results[0];
  const { lat, lng } = location;

  res
    .status(200)
    .send(
      new ApiResponse(
        200,
        { lat, lng },
        "Successfully retrieved the location lat/long"
      )
    );
});
const getDistanceAndTime = asyncHandler(async (req: Request, res: Response) => {
  const { origin, destination } = req.query;

  if (!origin || !destination) {
    const response = new ApiError(
      404,
      "Address parameter is required1.",
      req.query
    );
    res.status(400).send(response);
    return;
  }
  const apikey = process.env.googleApiKey;

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    //@ts-ignore
    origin
  )}&destinations=${encodeURIComponent(
    //@ts-ignore
    destination
  )}&key=${apikey}`;

  const response = await fetch(url, { method: "GET" });
  const data = await response.json();

  if (!response.ok || data.rows[0].elements[0].status === "ZERO_RESULTS") {
    res
      .status(response.status)
      .send(
        new ApiError(
          400,
          "Unsuccessful in retrieving the location lat/long",
          []
        )
      );
    return;
  }

  const location = data.rows[0].elements[0];
  res
    .status(200)
    .send(
      new ApiResponse(
        200,
        location,
        "Successfully retrieved the distance and time"
      )
    );
});
const getSuggestions = asyncHandler(async (req: Request, res: Response) => {
  const address = req.query.address as string;

  if (!address) {
    const response = new ApiError(404, "Address parameter is required.");
    res.status(400).send(response);
    return;
  }
  const apikey = process.env.googleApiKey;

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${address}&key=${apikey}`;

  const response = await fetch(url, { method: "GET" });
  const data = await response.json();
  const locations = data.predictions.map((value: Prediction) => {
    return value.description;
  });

  res
    .status(200)
    .send(
      new ApiResponse(
        200,
        locations,
        "Successfully retrieved the distance and time"
      )
    );
});

export { getCoordinates, getDistanceAndTime, getSuggestions };
