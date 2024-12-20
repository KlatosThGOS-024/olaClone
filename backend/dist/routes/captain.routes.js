"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const captain_controller_1 = require("../controllers/captain.controller");
const user_middleware_1 = require("../middleware/user.middleware");
const captainRouter = (0, express_1.Router)();
captainRouter.route("/signUp").post(captain_controller_1.captainCreate);
captainRouter.route("/login").post(captain_controller_1.captainLogin);
captainRouter.route("/user-profile").get(user_middleware_1.captainAuth, captain_controller_1.userProfileFromCaptain);
captainRouter.route("/captain-ride/update").put(user_middleware_1.captainAuth, captain_controller_1.updateCaptainRide);
captainRouter.route("/profile").get(user_middleware_1.captainAuth, captain_controller_1.captainProfile);
captainRouter.route("/logout").get(user_middleware_1.captainAuth, captain_controller_1.captainLogout);
exports.default = captainRouter;
