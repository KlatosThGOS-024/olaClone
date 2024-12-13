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
exports.getCoordinates = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const ApiResponse_1 = __importDefault(require("../utils/ApiResponse"));
const getCoordinates = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const address = req.query.address;
    if (!address) {
        const res2 = new ApiError_1.default(404, "Address query parameter is required.");
        res.status(400).send(res2);
        return;
    }
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyA2kNS0EWbSA4vG2C0WNL9k_qfxFLn-ImE`;
    const response = yield fetch(url, { method: "GET" });
    const data = yield response.json();
    const location = data.results[0].geometry.location;
    if (!response.ok) {
        res
            .status(response.status)
            .send(new ApiError_1.default(400, "Un Successfull the location lat/long", []));
        return;
    }
    res
        .status(200)
        .send(new ApiResponse_1.default(200, location, "Successfully retrevied the location lat/long"));
}));
exports.getCoordinates = getCoordinates;
