"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.captainLoginSchema = exports.captainCreateSchema = void 0;
const zod_1 = require("zod");
const captainCreateSchema = zod_1.z.object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    password: zod_1.z
        .string()
        .min(8, "Password at least 8 digit containing A-Z/a-z/symbols")
        .regex(/[A-Z]/, "Must include an uppercase letter")
        .regex(/[0-9]/, "Must include a number"),
    username: zod_1.z.string().min(3, "Username should be at least 3 digit"),
    email: zod_1.z.string().email("Please enter a valid email"),
    vehicle: zod_1.z.object({
        color: zod_1.z.string(),
        plate: zod_1.z.string(),
        capacity: zod_1.z.number(),
        vehicleType: zod_1.z.string(),
    }),
    location: zod_1.z.object({
        lat: zod_1.z.number(),
        long: zod_1.z.number(),
    }),
});
exports.captainCreateSchema = captainCreateSchema;
const captainLoginSchema = zod_1.z.object({
    password: zod_1.z.string(),
    username: zod_1.z.string().min(3, "Username should be at least 3 digit"),
});
exports.captainLoginSchema = captainLoginSchema;
