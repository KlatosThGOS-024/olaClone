import mongoose, { model, Model, Schema } from "mongoose";
import { IRide } from "../types/ride.types";
import bcrypt from "bcrypt";

const rideSchema = new Schema<IRide>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  pickupLocation: {
    type: String,
    required: true,
  },
  // Sjernf@!34
  destinationLocation: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Captain",
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
    default: "pending",
  },
  vehicleType: {
    type: String,
    enum: ["OlaGo", "olaChopper", "olaTukTuk", "olaMoto"],
  },
  duration: {
    type: Number,
  },
  distance: {
    type: Number,
  },
  paymentID: {
    type: String,
  },
  oderId: {
    type: String,
  },
  signautre: {
    type: String,
  },
  otp: {
    type: String,
    require: true,
    select: false,
  },
});

rideSchema.methods.generateOTP = async () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const salt = await bcrypt.genSalt(10);
  const hashedOTP = await bcrypt.hash(otp, salt);
  return { otp, hashedOTP };
};

rideSchema.methods.verifyOTP = async (
  otp: string,
  hashedOTP: string
): Promise<boolean> => {
  return bcrypt.compare(otp, hashedOTP);
};

const Ride = model<IRide>("Ride", rideSchema);
export default Ride;
