import { z } from "zod";
export interface IUser extends Document {
  _id?: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  username: string;
  comparePassword(password: string): Promise<boolean>;
  generateAccessTokenMethod(): any;
}

const userCreateSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  password: z
    .string()
    .min(8, "Password at least 8 digit containing A-Z/a-z/symbols")
    .regex(/[A-Z]/, "Must include an uppercase letter")
    .regex(/[0-9]/, "Must include a number"),
  username: z.string().min(3, "Username should be at least 3 digit"),
  email: z.string().email("Please enter a valid email"),
});
const userLoginSchema = z.object({
  password: z.string(),
  username: z.string().min(3, "Username should be at least 3 digit"),
});

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}

export { userCreateSchema, userLoginSchema };
