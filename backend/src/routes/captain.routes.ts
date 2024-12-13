import { Router } from "express";
import {
  captainCreate,
  captainLogin,
  captainLogout,
  captainProfile,
} from "../controllers/captain.controller";
import { captainAuth } from "../middleware/user.middleware";

const captainRouter = Router();
captainRouter.route("/signUp").post(captainCreate);
captainRouter.route("/login").post(captainLogin);
captainRouter.route("/profile").get(captainAuth, captainProfile);
captainRouter.route("/logout").get(captainAuth, captainLogout);
export default captainRouter;
