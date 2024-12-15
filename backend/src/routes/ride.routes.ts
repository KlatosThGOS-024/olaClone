import { Router } from "express";
import { userAuth } from "../middleware/user.middleware";
import createRide from "../controllers/ride.controller";

const rideRouter = Router();
rideRouter.route("/user-ride").post(userAuth, createRide);

export default rideRouter;
