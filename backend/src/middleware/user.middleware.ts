import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import ApiError from "../utils/ApiError";
import User from "../models/user.models";
import Captain from "../models/captain.models";

const userAuth = (req: Request, res: Response, next: NextFunction) => {
  (async () => {
    try {
      const jwtToken = req.headers?.authorization || req.cookies?.accessToken;

      if (!jwtToken) {
        return next(new ApiError(400, "Token not provided."));
      }

      const token = jwtToken.startsWith("Bearer ")
        ? jwtToken.split("Bearer ")[1]
        : jwtToken;

      if (!token) {
        return next(new ApiError(400, "Invalid token format."));
      }

      const decodedToken = jwt.verify(token, "process.env.accessTokenSecret");
      const userId = (decodedToken as JwtPayload)._id;

      const user = await User.findById(userId).select("-password");

      if (!user) {
        return next(new ApiError(400, "No User Found with this token."));
      }

      req.user = user;
      next();
    } catch (error: any) {
      console.error("Authorization error:", error.message || error);
      next(new ApiError(400, "Un-Authorized Access", [], error.error));
    }
  })();
};
const captainAuth = (req: Request, res: Response, next: NextFunction) => {
  (async () => {
    try {
      const jwtToken = req.headers?.authorization || req.cookies?.accessToken;

      if (!jwtToken) {
        return next(new ApiError(400, "Token not provided."));
      }

      const token = jwtToken.startsWith("Bearer ")
        ? jwtToken.split("Bearer ")[1]
        : jwtToken;

      if (!token) {
        return next(new ApiError(400, "Invalid token format."));
      }

      const decodedToken = jwt.verify(token, "process.env.accessTokenSecret");
      const captainId = (decodedToken as JwtPayload)._id;

      const captain = await Captain.findById(captainId).select("-password");

      if (!captain) {
        return next(new ApiError(400, "No User Found with this token."));
      }

      req.captain = captain;
      next();
    } catch (error: any) {
      console.error("Authorization error:", error.message || error);
      next(new ApiError(400, "Un-Authorized Access", [], error.error));
    }
  })();
};

export { userAuth, captainAuth };
