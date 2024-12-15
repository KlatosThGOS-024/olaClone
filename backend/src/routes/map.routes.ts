import { Router } from "express";
import { userAuth } from "../middleware/user.middleware";
import {
  getCoordinates,
  getDistanceAndTime,
  getSuggestions,
} from "../controllers/map.controller";

const mapRouter = Router();

mapRouter.route("/get-corrdinates").get(getCoordinates);
mapRouter.route("/get-distance-time").get(getDistanceAndTime);
mapRouter.route("/getSuggestion").get(getSuggestions);
export default mapRouter;
