"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const captainSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/.test(value);
            },
            message: "Password should be at least 8 characters with a mix of digits, uppercase, lowercase, and special characters.",
        },
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /\S+@\S+\.\S+/.test(value);
            },
            message: "Invalid email format.",
        },
    },
    username: {
        type: String,
        required: true,
        unique: true,
        indexedDB: true,
        length: [3, "Username at least 3 digit"],
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive",
    },
    vehicle: {
        color: {
            type: String,
            require: true,
            minlength: [3, "Please Enter color of your vechile"],
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "Please Enter color of your vechile"],
        },
        capacity: {
            require: true,
            type: Number,
            minlength: [1, "Please Enter color of your vechile"],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ["Car", "Bike", "Truckun"],
        },
    },
    location: {
        lat: {
            type: Number,
        },
        long: {
            type: Number,
        },
    },
    accessToken: {
        type: String,
    },
    rides: {
        cancelled: [
            {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Ride",
            },
        ],
        ongoing: [
            {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Ride",
            },
        ],
        completed: [
            {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Ride",
            },
        ],
    },
});
captainSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified("password")) {
            const hashPassword = yield bcrypt_1.default.hash(this.password, 10);
            this.password = hashPassword;
        }
    });
});
captainSchema.methods.comparePassword = function (password) {
    return bcrypt_1.default.compare(password, this.password);
};
captainSchema.methods.generateAccessTokenMethod = function () {
    return jsonwebtoken_1.default.sign({
        _id: this._id,
        username: this.username,
    }, "process.env.accessTokenSecret");
};
const Captain = (0, mongoose_1.model)("Captain", captainSchema);
exports.default = Captain;
