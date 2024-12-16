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
exports.getSuggestions = exports.getDistanceAndTime = exports.getCoordinates = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const ApiResponse_1 = __importDefault(require("../utils/ApiResponse"));
const getCoordinates = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const address = req.query.address;
    if (!address) {
        const response = new ApiError_1.default(404, "Address query parameter is required.");
        res.status(400).send(response);
        return;
    }
    const apikey = process.env.googleApiKey;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apikey}`;
    const response = yield fetch(url, { method: "GET" });
    const data = yield response.json();
    if (!response.ok || data.results.length === 0) {
        res
            .status(response.status)
            .send(new ApiError_1.default(400, "Unsuccessful in retrieving the location lat/long", []));
        return;
    }
    const location = data.results[0];
    const { lat, lng } = location;
    res
        .status(200)
        .send(new ApiResponse_1.default(200, { lat, lng }, "Successfully retrieved the location lat/long"));
}));
exports.getCoordinates = getCoordinates;
const getDistanceAndTime = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { origin, destination } = req.query;
    if (!origin || !destination) {
        const response = new ApiError_1.default(404, "Address parameter is required1.", req.query);
        res.status(400).send(response);
        return;
    }
    const apikey = process.env.googleApiKey;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    //@ts-ignore
    origin)}&destinations=${encodeURIComponent(
    //@ts-ignore
    destination)}&key=${apikey}`;
    const response = yield fetch(url, { method: "GET" });
    const data = yield response.json();
    if (!response.ok || data.rows[0].elements[0].status === "ZERO_RESULTS") {
        res
            .status(response.status)
            .send(new ApiError_1.default(400, "Unsuccessful in retrieving the location lat/long", []));
        return;
    }
    const location = data.rows[0].elements[0];
    res
        .status(200)
        .send(new ApiResponse_1.default(200, location, "Successfully retrieved the distance and time"));
}));
exports.getDistanceAndTime = getDistanceAndTime;
const getSuggestions = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const address = req.query.address;
    if (!address) {
        const response = new ApiError_1.default(404, "Address parameter is required.");
        res.status(400).send(response);
        return;
    }
    const apikey = process.env.googleApiKey;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${address}&key=${apikey}`;
    const response = yield fetch(url, { method: "GET" });
    const data = yield response.json();
    const locations = data.predictions.map((value) => {
        return value.description;
    });
    res
        .status(200)
        .send(new ApiResponse_1.default(200, locations, "Successfully retrieved the distance and time"));
}));
exports.getSuggestions = getSuggestions;
