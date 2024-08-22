import { Schema, model } from "mongoose";
import { ICommentModel } from "types/items";

const ratingSchema = new Schema(
  {
    rating: { type: Number, require: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    item: {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  },
  { timestamps: true },
);

export const Rating = model<ICommentModel>("Rating", ratingSchema);
