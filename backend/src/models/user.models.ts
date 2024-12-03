import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  username: string;
  comparePassword(password: string): Promise<boolean>;
  generateAccessTokenMethod(): any;
}

const userSchema = new Schema<IUser>({
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
});

userSchema.pre("save", async function () {
  const hashPassword = await bcrypt.hash(this.password, 10);
  this.password = hashPassword;
});

userSchema.methods.comparePassword = function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessTokenMethod = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
    },
    "process.env.accessTokenSecret"
  );
};

const User = model<IUser>("User", userSchema);
export default User;
