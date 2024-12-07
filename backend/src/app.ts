import express from "express";
import userRouter from "./routes/user.routes";
import captainRouter from "./routes/captain.routes";

const router = express();

router.use("/user", userRouter);
router.use("/captain", captainRouter);
export default router;
