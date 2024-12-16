"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const captain_routes_1 = __importDefault(require("./routes/captain.routes"));
const map_routes_1 = __importDefault(require("./routes/map.routes"));
const ride_routes_1 = __importDefault(require("./routes/ride.routes"));
const router = (0, express_1.default)();
router.use("/api/v1/user", user_routes_1.default);
router.use("/api/v1/captain", captain_routes_1.default);
router.use("/api/v1/map", map_routes_1.default);
router.use("/api/v1/ride", ride_routes_1.default);
exports.default = router;
