import express from "express";
import userRouter from "./routes/user.routes";
import captainRouter from "./routes/captain.routes";
import mapRouter from "./routes/map.routes";

const router = express();

router.use("/api/v1/user", userRouter);
router.use("/api/v1/captain", captainRouter);
router.use("/api/v1/map", mapRouter);
export default router;
