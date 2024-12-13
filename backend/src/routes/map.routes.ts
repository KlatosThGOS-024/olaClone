import { Router } from "express";
import { userAuth } from "../middleware/user.middleware";
import { getCoordinates } from "../controllers/map.controller";

const mapRouter = Router();

mapRouter.route("/get-corrdinates").get(getCoordinates);

export default mapRouter;
