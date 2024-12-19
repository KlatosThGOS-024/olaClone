import { Router } from "express";
import {
  captainCreate,
  captainLogin,
  captainLogout,
  captainProfile,
  updateCaptainOngoin,
  userProfileFromCaptain,
} from "../controllers/captain.controller";
import { captainAuth } from "../middleware/user.middleware";
import { userProfile } from "../controllers/user.controller";

const captainRouter = Router();
captainRouter.route("/signUp").post(captainCreate);
captainRouter.route("/login").post(captainLogin);
captainRouter.route("/user-profile").get(captainAuth, userProfileFromCaptain);
captainRouter
  .route("/captain-update-ongoing")
  .put(captainAuth, updateCaptainOngoin);
captainRouter.route("/profile").get(captainAuth, captainProfile);
captainRouter.route("/logout").get(captainAuth, captainLogout);
export default captainRouter;
