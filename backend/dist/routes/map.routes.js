"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const map_controller_1 = require("../controllers/map.controller");
const mapRouter = (0, express_1.Router)();
mapRouter.route("/get-corrdinates").get(map_controller_1.getCoordinates);
exports.default = mapRouter;
