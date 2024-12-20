import { Router } from "express";
import { captainAuth, userAuth } from "../middleware/user.middleware";
import {
  createRide,
  getPendingRideByCaptain,
  getOngoingRide,
  getCurrentRide,
} from "../controllers/ride.controller";

const rideRouter = Router();
rideRouter.route("/user-ride").post(userAuth, createRide);
rideRouter
  .route("/captain-ride/pending")
  .get(captainAuth, getPendingRideByCaptain);
rideRouter.route("/user-ride/current").get(userAuth, getCurrentRide);
rideRouter.route("/ongoing-ride").get(captainAuth, getOngoingRide);
export default rideRouter;
