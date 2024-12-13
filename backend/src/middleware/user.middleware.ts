import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import ApiError from "../utils/ApiError";
import User from "../models/user.models";
import Captain from "../models/captain.models";
const userAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwtToken = req.headers?.authorization || req.cookies.accessToken;
    const token = jwtToken.split("Bearer")[1].split(" ")[1];
    const decodedToken = jwt.verify(token, "process.env.accessTokenSecret");
    //@ts-ignore
    const id: string | JwtPayload = decodedToken?._id;
    const user = await User.findById(id).select("-password");
    if (!user) {
      const data = new ApiError(400, "No User Found with this token");
      res.status(400).send(data);
      return;
    }
    req.user = user;
    next();
  } catch (error: any) {
    const data = new ApiError(400, "Un-Authorized Access", [], error.error);
    res.status(400).send(data);
    return;
  }
};
const captainAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwtToken = req.headers?.authorization || req.cookies.accessToken;
    const token = jwtToken.split("Bearer")[1].split(" ")[1];
    const decodedToken = jwt.verify(token, "process.env.accessTokenSecret");
    //@ts-ignore
    const id: string | JwtPayload = decodedToken?._id;
    const captain = await Captain.findById(id).select("-password");
    if (!captain) {
      const data = new ApiError(400, "No Captain Found with this token");
      res.status(400).send(data);
      return;
    }
    req.captain = captain;
    next();
  } catch (error: any) {
    const data = new ApiError(400, "Un-Authorized Access", [], error.error);
    res.status(400).send(data);
    return;
  }
};
export { userAuth, captainAuth };
