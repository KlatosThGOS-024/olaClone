import { Router } from "express";
import {
  userCreate,
  userLogin,
  userLogout,
} from "../controllers/user.controller";
import { userAuth } from "../middleware/user.middleware";

const userRouter = Router();
userRouter.route("/signUp").post(userCreate);
userRouter.route("/login").post(userLogin);
userRouter.route("/logout").get(userAuth, userLogout);
export default userRouter;
