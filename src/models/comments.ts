import { Schema, model } from "mongoose";
import { ICommentModel } from "types/items";

const commentsSchema = new Schema(
  {
    comment: { type: String, require: true },
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

export const Comments = model<ICommentModel>("Comment", commentsSchema);
