"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = exports.userCreateSchema = void 0;
const zod_1 = require("zod");
const userCreateSchema = zod_1.z.object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    password: zod_1.z
        .string()
        .min(8, "Password at least 8 digit containing A-Z/a-z/symbols")
        .regex(/[A-Z]/, "Must include an uppercase letter")
        .regex(/[0-9]/, "Must include a number"),
    username: zod_1.z.string().min(3, "Username should be at least 3 digit"),
    email: zod_1.z.string().email("Please enter a valid email"),
});
exports.userCreateSchema = userCreateSchema;
const userLoginSchema = zod_1.z.object({
    password: zod_1.z.string(),
    username: zod_1.z.string().min(3, "Username should be at least 3 digit"),
});
exports.userLoginSchema = userLoginSchema;
