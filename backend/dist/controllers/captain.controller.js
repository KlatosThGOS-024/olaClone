"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.captainLogout = exports.captainLogin = exports.captainCreate = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const ApiResponse_1 = __importDefault(require("../utils/ApiResponse"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const captain_models_1 = __importDefault(require("../models/captain.models"));
const captain_types_1 = require("../types/captain.types");
const generateAccessToken = (captain) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = yield captain.generateAccessTokenMethod();
    return accessToken;
  });
const captainCreate = (0, asyncHandler_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const captainData = captain_types_1.captainCreateSchema.safeParse(req.body);
    if (!captainData.success) {
      res
        .status(402)
        .send(
          new ApiError_1.default(
            400,
            "Credentials are wrong",
            captainData.error,
            [],
            "Validation error occurred"
          )
        );
      return;
    }
    const captainExisted = yield captain_models_1.default.find({
      username:
        captainData === null || captainData === void 0
          ? void 0
          : captainData.data.username,
    });
    if (captainExisted.length) {
      const resData = new ApiError_1.default(
        400,
        "Error the user with this username already existed"
      );
      res.status(400).send(resData);
      return;
    }
    const captain = yield captain_models_1.default.create({
      username:
        captainData === null || captainData === void 0
          ? void 0
          : captainData.data.username,
      firstName:
        captainData === null || captainData === void 0
          ? void 0
          : captainData.data.firstName,
      lastName:
        captainData === null || captainData === void 0
          ? void 0
          : captainData.data.lastName,
      password:
        captainData === null || captainData === void 0
          ? void 0
          : captainData.data.password,
      email:
        captainData === null || captainData === void 0
          ? void 0
          : captainData.data.email,
      vehicle: {
        plate:
          captainData === null || captainData === void 0
            ? void 0
            : captainData.data.vehicle.plate,
        color:
          captainData === null || captainData === void 0
            ? void 0
            : captainData.data.vehicle.color,
        capacity:
          captainData === null || captainData === void 0
            ? void 0
            : captainData.data.vehicle.capacity,
        vehicleType:
          captainData === null || captainData === void 0
            ? void 0
            : captainData.data.vehicle.vehicleType,
      },
      location: {
        lat:
          captainData === null || captainData === void 0
            ? void 0
            : captainData.data.location.lat,
        long:
          captainData === null || captainData === void 0
            ? void 0
            : captainData.data.location.long,
      },
    });
    res.send(
      new ApiResponse_1.default(
        200,
        captain,
        "Successfully craeted the account"
      )
    );
  })
);
exports.captainCreate = captainCreate;
const captainLogin = (0, asyncHandler_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const captainData = captain_types_1.captainLoginSchema.safeParse(req.body);
    if (!captainData.success) {
      res.send(
        new ApiError_1.default(
          400,
          "Credentails are wrong",
          captainData.error,
          [],
          "Validation error occurred"
        )
      );
      return;
    }
    const captainExisted = yield captain_models_1.default.findOne({
      username:
        captainData === null || captainData === void 0
          ? void 0
          : captainData.data.username,
    });
    if (!captainExisted) {
      res
        .status(400)
        .send(
          new ApiError_1.default(
            400,
            "Error the user with this username doesn't existed"
          )
        );
      return;
    }
    captainExisted.status = "active";
    const passwordComp = yield captainExisted.comparePassword(
      captainData === null || captainData === void 0
        ? void 0
        : captainData.data.password
    );
    if (!passwordComp) {
      res.send(new ApiError_1.default(400, "Credentails are wrong"));
      return;
    }
    const accessToken = yield generateAccessToken(captainExisted);
    res
      .cookie("accessToken", accessToken)
      .send(
        new ApiResponse_1.default(200, captainExisted, "Successfully login")
      );
  })
);
exports.captainLogin = captainLogin;
const captainLogout = (0, asyncHandler_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const captain = req.captain;
    captain.status = "inactive";
    res
      .clearCookie("accessToken")
      .status(200)
      .send(new ApiResponse_1.default(200, captain, "Successfully Logout"));
  })
);
exports.captainLogout = captainLogout;
