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
exports.userProfile = exports.userLogout = exports.userLogin = exports.userCreate = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const ApiResponse_1 = __importDefault(require("../utils/ApiResponse"));
const user_types_1 = require("../types/user.types");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const user_models_1 = __importDefault(require("../models/user.models"));
const generateAccessToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = yield user.generateAccessTokenMethod();
    return accessToken;
});
const userCreate = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = user_types_1.userCreateSchema.safeParse(req.body);
    if (!userData.success) {
        res.send(new ApiError_1.default(400, "Credentails are wrong", userData.data));
        return;
    }
    const userExisted = yield user_models_1.default.find({
        username: userData === null || userData === void 0 ? void 0 : userData.data.username,
    });
    if (userExisted.length) {
        const resData = new ApiError_1.default(400, "Error the user with this username already existed");
        res.status(400).send(resData);
        return;
    }
    const user = yield user_models_1.default.create({
        username: userData === null || userData === void 0 ? void 0 : userData.data.username,
        firstName: userData === null || userData === void 0 ? void 0 : userData.data.firstName,
        lastName: userData === null || userData === void 0 ? void 0 : userData.data.lastName,
        password: userData === null || userData === void 0 ? void 0 : userData.data.password,
        email: userData === null || userData === void 0 ? void 0 : userData.data.email,
    });
    res.send(new ApiResponse_1.default(200, user, "Successfully craeted the account"));
}));
exports.userCreate = userCreate;
const userLogin = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = user_types_1.userLoginSchema.safeParse(req.body);
    if (!userData.success) {
        res.send(new ApiError_1.default(400, "Credentails are wrong", userData.data));
        return;
    }
    const userExisted = yield user_models_1.default.findOne({
        username: userData === null || userData === void 0 ? void 0 : userData.data.username,
    });
    if (!userExisted) {
        res
            .status(400)
            .send(new ApiError_1.default(400, "Error the user with this username doesn't existed"));
        return;
    }
    const passwordComp = yield userExisted.comparePassword(userData === null || userData === void 0 ? void 0 : userData.data.password);
    if (!passwordComp) {
        res.send(new ApiError_1.default(400, "Credentails are wrong"));
        return;
    }
    const accessToken = yield generateAccessToken(userExisted);
    res
        .cookie("accessToken", accessToken)
        .send(new ApiResponse_1.default(200, accessToken, "Successfully login"));
}));
exports.userLogin = userLogin;
const userProfile = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    if (!userId) {
        res.status(400).send(new ApiError_1.default(400, "User Profie unsuccessfull"));
    }
    const user = yield user_models_1.default.findById(userId);
    if (!user) {
        res.status(400).send(new ApiError_1.default(400, "User Profie unsuccessfull"));
    }
    res
        .status(200)
        .send(new ApiResponse_1.default(200, user, "User Profile Successfully retrevied"));
}));
exports.userProfile = userProfile;
const userLogout = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res
        .clearCookie("accessToken")
        .status(200)
        .send(new ApiResponse_1.default(200, "Successfully Logout"));
}));
exports.userLogout = userLogout;
