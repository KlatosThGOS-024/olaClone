import mongoose, { model, Model, Schema } from "mongoose";
import { IRide } from "../types/ride.types";
import bcrypt from "bcrypt";
// type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: "User",
const rideSchema = new Schema<IRide>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  passengerName: {
    type: String,
    required: true,
  },
  passengerImage: {
    type: String,
    required: true,
  },
  pickupLocation: {
    type: String,
    required: true,
  },
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
  paymentId: {
    type: String,
  },
  orderId: {
    type: String,
  },
  signature: {
    type: String,
  },
  otp: { type: String },
  otpHash: { type: String },
  otpExpiresAt: { type: Date },
});

rideSchema.methods.generateOTP = async function () {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const salt = await bcrypt.genSalt(10);
  this.otpHash = await bcrypt.hash(otp, salt);
  this.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
  await this.save();
  this.otp = otp;
  return otp;
};

rideSchema.methods.verifyOTP = async function (otp: string) {
  if (this.otpExpiresAt && this.otpExpiresAt < Date.now()) {
    throw new Error("OTP has expired. Please request a new one.");
  }
  return bcrypt.compare(otp, this.otpHash);
};
const Ride = model<IRide>("Ride", rideSchema);
export default Ride;
