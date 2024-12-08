"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const captain_routes_1 = __importDefault(require("./routes/captain.routes"));
const router = (0, express_1.default)();
router.use("/user", user_routes_1.default);
router.use("/captain", captain_routes_1.default);
exports.default = router;
