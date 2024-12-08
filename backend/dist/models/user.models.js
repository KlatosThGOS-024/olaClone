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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema = new mongoose_1.Schema({
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
});
userSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const hashPassword = yield bcrypt_1.default.hash(this.password, 10);
        this.password = hashPassword;
    });
});
userSchema.methods.comparePassword = function (password) {
    return bcrypt_1.default.compare(password, this.password);
};
userSchema.methods.generateAccessTokenMethod = function () {
    return jsonwebtoken_1.default.sign({
        _id: this._id,
        username: this.username,
    }, "process.env.accessTokenSecret");
};
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
