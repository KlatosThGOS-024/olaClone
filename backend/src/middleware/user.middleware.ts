import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import ApiError from "../utils/ApiError";
import User from "../models/user.models";
import Captain from "../models/captain.models";
const userAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwtToken = req.headers?.accessToken || req.cookies.accessToken;
    const decodedToken = jwt.verify(jwtToken, "process.env.accessTokenSecret");
    //@ts-ignore
    const id: string | JwtPayload = decodedToken?._id;
    const user = await User.findById(id);
    if (!user) {
      const data = new ApiError(400, "No User Found with this token");
      res.status(400).send(data);
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    const data = new ApiError(400, "Un-Authorized Access");
    res.status(400).send(data);
    return;
  }
};
const captainAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwtToken = req.headers?.accessToken || req.cookies.accessToken;
    const decodedToken = jwt.verify(jwtToken, "process.env.accessTokenSecret");
    //@ts-ignore
    const id: string | JwtPayload = decodedToken?._id;
    const captain = await Captain.findById(id);
    if (!captain) {
      const data = new ApiError(400, "No User Found with this token");
      res.status(400).send(data);
      return;
    }
    req.captain = captain;
    next();
  } catch (error) {
    const data = new ApiError(400, "Un-Authorized Access");
    res.status(400).send(data);
    return;
  }
};
export { userAuth, captainAuth };
