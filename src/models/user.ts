import { Schema, model } from "mongoose";
import { IUser } from "types/user";

const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    country: { type: String },
    companyName: { type: String },
    streetAddress: { type: String },
    apt: { type: String },
    city: { type: String },
    state: { type: String },
    phone: { type: String },
    postalCode: { type: Number },
    deliveryInstruction: { type: String },
    defaultShippingAddress: { type: Boolean, default: false },
    defaultBillingAddress: { type: Boolean, default: false },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  { timestamps: true },
);

export const User = model<IUser>("User", userSchema);
