"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOngoingRide = exports.getPendingRideByCaptain = exports.getPendingRideByUser = exports.createRide = void 0;
const ride_models_1 = __importDefault(require("../models/ride.models"));
const ride_types_1 = require("../types/ride.types");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const ApiResponse_1 = __importDefault(require("../utils/ApiResponse"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const calculateFare = ({ vehicle, pickupLocation, destinationLocation, vehicleFee, vehicleAway, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = `http://localhost:3000/api/v1/map/get-distance-time?origin=${pickupLocation}&destination=${destinationLocation}`;
        const response = yield fetch(url, { method: "GET" });
        if (!response.ok) {
            throw new Error(`Failed to fetch distance and time: ${response.status}`);
        }
        const data = yield response.json();
        const distanceInMeters = data.data.distance.value;
        const distanceInKm = distanceInMeters / 1000;
        // Convert vehicleFee to a number (assuming it starts with a currency symbol, e.g., ₹)
        const baseFee = parseFloat(vehicleFee.replace(/[^\d.]/g, "")); // Removes non-numeric characters
        // Determine fare per kilometer based on vehicle type
        let farePerKm;
        switch (vehicle) {
            case "OlaGo":
                farePerKm = 12; // Example fare for OlaGo
                break;
            case "olaChopper":
                farePerKm = 15; // Example fare for olaChopper
                break;
            case "olaTukTuk":
                farePerKm = 8; // Example fare for olaTukTuk
                break;
            case "olaMoto":
                farePerKm = 5; // Example fare for olaMoto
                break;
            default:
                return "Invalid vehicle type.";
        }
        // Calculate total fare
        const distanceFare = distanceInKm * farePerKm;
        const totalFare = baseFee + distanceFare;
        console.log(`Vehicle is ${vehicleAway}`);
        return Math.round(totalFare);
    }
    catch (error) {
        console.error("Error calculating fare:", error.message);
        return "Failed to calculate fare.";
    }
});
const createRide = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const rideData = ride_types_1.rideCreateSchema.safeParse(req.body);
    const user = req.user;
    if (!rideData.success || !req.user) {
        res
            .status(400)
            .send(new ApiError_1.default(400, "Credentails are wrong", rideData.error));
        return;
    }
    const { vehicle, pickupLocation, destinationLocation, vehicleFee, vehicleAway, } = rideData.data;
    const fare = yield calculateFare({
        vehicle,
        pickupLocation,
        destinationLocation,
        vehicleFee,
        vehicleAway,
    });
    const rideCreate = yield ride_models_1.default.create({
        user: (_a = req.user._id) === null || _a === void 0 ? void 0 : _a.toString(),
        vehicleType: vehicle,
        pickupLocation,
        destinationLocation,
        fare,
        passengerName: user.firstName + " " + user.lastName,
        passengerImage: user.firstName,
        userId: user._id,
    });
    const otp = yield rideCreate.generateOTP();
    console.log(otp);
    res.send(new ApiResponse_1.default(200, rideCreate, "Successfully craeted the Ride"));
}));
exports.createRide = createRide;
const getPendingRideByUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req.user._id) === null || _b === void 0 ? void 0 : _b.toString();
    console.log(userId);
    const getRide = yield ride_models_1.default.find({
        status: "pending",
    });
    res
        .status(200)
        .send(new ApiResponse_1.default(200, getRide, "Successfully Get the Ride"));
}));
exports.getPendingRideByUser = getPendingRideByUser;
const getOngoingRide = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rideId } = req.query;
    if (!rideId) {
        res
            .status(400)
            .send(new ApiError_1.default(400, "Error while getting the rideId", rideId));
    }
    const getRide = yield ride_models_1.default.findById(rideId);
    if (!getRide) {
        res
            .status(400)
            .send(new ApiError_1.default(400, "Error while getting the Ride", getRide));
    }
    res.send(new ApiResponse_1.default(200, getRide, "Successfully Get the Ride"));
}));
exports.getOngoingRide = getOngoingRide;
const getPendingRideByCaptain = (0, asyncHandler_1.default)((_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getRide = yield ride_models_1.default.find({
        status: "pending",
    });
    res.send(new ApiResponse_1.default(200, getRide, "Successfully Get the Ride"));
}));
exports.getPendingRideByCaptain = getPendingRideByCaptain;
