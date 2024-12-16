import { Router } from "express";
import { captainAuth, userAuth } from "../middleware/user.middleware";
import {
  createRide,
  getPendingRideByUser,
  getPendingRideByCaptain,
} from "../controllers/ride.controller";

const rideRouter = Router();
rideRouter.route("/user-ride").post(userAuth, createRide);
rideRouter.route("/user-ride/pending").get(userAuth, getPendingRideByUser);
rideRouter
  .route("/captain-ride/pending")
  .get(captainAuth, getPendingRideByCaptain);

export default rideRouter;
