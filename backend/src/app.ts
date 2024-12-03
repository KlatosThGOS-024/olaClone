import express from "express";

import userRouter from "./routes/user.routes";

const router = express();

router.use("/user", userRouter);
export default router;
