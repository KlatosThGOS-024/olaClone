import express from "express";
import userRouter from "./routes/user.routes";
import captainRouter from "./routes/captain.routes";
import mapRouter from "./routes/map.routes";
import rideRouter from "./routes/ride.routes";

const router = express();

router.use("/api/v1/user", userRouter);
router.use("/api/v1/captain", captainRouter);
router.use("/api/v1/map", mapRouter);
router.use("/api/v1/ride", rideRouter);
export default router;
