import { Schema, model } from "mongoose";
import { IUser } from "types/user";

const userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  { timestamps: true },
);

export const User = model<IUser>("User", userSchema);
