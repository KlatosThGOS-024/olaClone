"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_middleware_1 = require("../middleware/user.middleware");
const ride_controller_1 = require("../controllers/ride.controller");
const rideRouter = (0, express_1.Router)();
rideRouter.route("/user-ride").post(user_middleware_1.userAuth, ride_controller_1.createRide);
rideRouter.route("/user-ride/pending").get(user_middleware_1.userAuth, ride_controller_1.getPendingRideByUser);
rideRouter
    .route("/captain-ride/pending")
    .get(user_middleware_1.captainAuth, ride_controller_1.getPendingRideByCaptain);
exports.default = rideRouter;
