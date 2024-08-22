import { Schema, model } from "mongoose";
import { IItem } from "types/items";

const itemsSchema = new Schema(
  {
    type: { type: String, require: true },
    price: { type: Number, require: true },
    color: { type: String, require: true },
    size: { type: String, require: true },
    style: { type: String, require: true },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    rating: { type: Number, default: 0 },
    usersRatings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true },
);

export const Items = model<IItem>("Item", itemsSchema);
