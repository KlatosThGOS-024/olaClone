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
exports.captainAuth = exports.userAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const user_models_1 = __importDefault(require("../models/user.models"));
const captain_models_1 = __importDefault(require("../models/captain.models"));
const userAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const jwtToken = ((_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) || req.cookies.accessToken;
        const token = jwtToken.split("Bearer")[1].split(" ")[1];
        const decodedToken = jsonwebtoken_1.default.verify(token, "process.env.accessTokenSecret");
        //@ts-ignore
        const id = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken._id;
        const user = yield user_models_1.default.findById(id).select("-password");
        if (!user) {
            const data = new ApiError_1.default(400, "No User Found with this token");
            res.status(400).send(data);
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        const data = new ApiError_1.default(400, "Un-Authorized Access", [], error.error);
        res.status(400).send(data);
        return;
    }
});
exports.userAuth = userAuth;
const captainAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const jwtToken = ((_b = req.headers) === null || _b === void 0 ? void 0 : _b.authorization) || req.cookies.accessToken;
        const token = jwtToken.split("Bearer")[1].split(" ")[1];
        const decodedToken = jsonwebtoken_1.default.verify(token, "process.env.accessTokenSecret");
        //@ts-ignore
        const id = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken._id;
        const captain = yield captain_models_1.default.findById(id).select("-password");
        if (!captain) {
            const data = new ApiError_1.default(400, "No Captain Found with this token");
            res.status(400).send(data);
            return;
        }
        req.captain = captain;
        next();
    }
    catch (error) {
        const data = new ApiError_1.default(400, "Un-Authorized Access", [], error.error);
        res.status(400).send(data);
        return;
    }
});
exports.captainAuth = captainAuth;
