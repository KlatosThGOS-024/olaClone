"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rideCreateSchema = void 0;
const zod_1 = require("zod");
const rideCreateSchema = zod_1.z.object({
    destinationLocation: zod_1.z.string().min(3, "Address should be at least 3 digit"),
    pickupLocation: zod_1.z.string().min(3, "Address should be at least 3 digit"),
    vehicleFee: zod_1.z.string(),
    vehicle: zod_1.z.enum(["OlaGo", "olaChopper", "olaTukTuk", "olaMoto"]),
    vehicleAway: zod_1.z.string(),
});
exports.rideCreateSchema = rideCreateSchema;
