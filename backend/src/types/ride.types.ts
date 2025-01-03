import mongoose from "mongoose";
import { z } from "zod";

export interface IRide extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  pickupLocation: string;
  passengerName: string;
  paymentId: string;
  passengerImage: string;
  destinationLocation: string;
  fare: Number;
  captain: mongoose.Schema.Types.ObjectId;
  duration: Number;
  status: string;
  distance: Number;
  paymentID: string;
  orderId: string;
  signature: string;
  vehicleType: string;
  otpHash: string;
  otpExpiresAt: Date;
  otp: string;
  generateOTP(): any;
}
const rideCreateSchema = z.object({
  destinationLocation: z.string().min(3, "Address should be at least 3 digit"),
  pickupLocation: z.string().min(3, "Address should be at least 3 digit"),
  vehicleFee: z.string(),
  vehicle: z.enum(["OlaGo", "olaChopper", "olaTukTuk", "olaMoto"]),
  vehicleAway: z.string(),
});
type RideCreateData = z.infer<typeof rideCreateSchema>;

export { rideCreateSchema, RideCreateData };
