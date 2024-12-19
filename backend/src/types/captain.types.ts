import mongoose, { Document } from "mongoose";
import { z } from "zod";

export interface ICaptain extends Document {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  username: string;
  comparePassword(password: string): Promise<boolean>;
  generateAccessTokenMethod(): any;
  socketId: string;
  status: string;
  vehicle: string;
  accessToken: string;
  location: {
    lat: number;

    lang: number;
  };
  rides: {
    cancelled: mongoose.Types.ObjectId[];
    ongoing: mongoose.Types.ObjectId[];
    completed: mongoose.Types.ObjectId[];
  };
}

const captainCreateSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  password: z
    .string()
    .min(8, "Password at least 8 digit containing A-Z/a-z/symbols")
    .regex(/[A-Z]/, "Must include an uppercase letter")
    .regex(/[0-9]/, "Must include a number"),
  username: z.string().min(3, "Username should be at least 3 digit"),
  email: z.string().email("Please enter a valid email"),
  vehicle: z.object({
    color: z.string(),
    plate: z.string(),
    capacity: z.number(),
    vehicleType: z.string(),
  }),
  location: z.object({
    lat: z.number(),
    long: z.number(),
  }),
});
const captainLoginSchema = z.object({
  password: z.string(),
  username: z.string().min(3, "Username should be at least 3 digit"),
});

declare global {
  namespace Express {
    interface Request {
      captain: ICaptain;
    }
  }
}

export { captainCreateSchema, captainLoginSchema };
