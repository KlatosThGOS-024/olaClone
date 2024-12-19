import mongoose, { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ICaptain } from "../types/captain.types";
import { string } from "zod";

const captainSchema = new Schema<ICaptain>({
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
      validator: function (value: string) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/.test(
          value
        );
      },
      message:
        "Password should be at least 8 characters with a mix of digits, uppercase, lowercase, and special characters.",
    },
  },
  email: {
    type: String,
    required: true,

    validate: {
      validator: function (value: string) {
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ride",
      },
    ],
    ongoing: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ride",
      },
    ],
    completed: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ride",
      },
    ],
  },
});
captainSchema.pre("save", async function (this: ICaptain) {
  if (this.isModified("password")) {
    const hashPassword = await bcrypt.hash(this.password, 10);
    this.password = hashPassword;
  }
});
captainSchema.methods.comparePassword = function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

captainSchema.methods.generateAccessTokenMethod = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
    },
    "process.env.accessTokenSecret"
  );
};

const Captain = model<ICaptain>("Captain", captainSchema);
export default Captain;
