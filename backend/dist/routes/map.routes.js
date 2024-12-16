"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const map_controller_1 = require("../controllers/map.controller");
const mapRouter = (0, express_1.Router)();
mapRouter.route("/get-corrdinates").get(map_controller_1.getCoordinates);
mapRouter.route("/get-distance-time").get(map_controller_1.getDistanceAndTime);
mapRouter.route("/getSuggestion").get(map_controller_1.getSuggestions);
exports.default = mapRouter;
