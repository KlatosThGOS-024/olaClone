import { Router } from "express";
import {
  captainCreate,
  captainLogin,
  captainLogout,
} from "../controllers/captain.controller";
import { captainAuth } from "../middleware/user.middleware";

const captainRouter = Router();
captainRouter.route("/signUp").post(captainCreate);
captainRouter.route("/login").post(captainLogin);
captainRouter.route("/logout").get(captainAuth, captainLogout);
export default captainRouter;
