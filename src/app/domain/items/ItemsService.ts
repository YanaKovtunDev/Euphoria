import { Comments } from "models/comments";
import { Items } from "models/items";
import { Rating } from "models/rating";
import { BadRequestError, NotFoundError } from "routing-controllers";
import {
  GetQueryParams,
  IComment,
  IItem,
  IRating,
  IRatingModel,
} from "types/items";
import { IUserTokenData } from "types/user";

export class ItemsServices {
  async getItems({
    size,
    type,
    minPrice,
    maxPrice,
    color,
    page = 1,
    limit = 12,
  }: GetQueryParams) {
    try {
      const items = await Items.find({
        size,
        type,
        color,
        price: { $gte: minPrice || 0, $lte: maxPrice || Infinity },
      })
        .select("-rating -usersRatings -comments")
        .limit(limit)
        .skip((page - 1) * limit);

      return {
        page,
        limit,
        items,
      };
    } catch (e) {
      throw e;
    }
  }

  async getItemById(id: string) {
    try {
      const item = await Items.findById(id);

      if (!item) throw new NotFoundError("Item not found");

      const rating =
        item?.rating && item.rating / (item.userRatings?.length ?? 1);
      const { userRatings, ...finalItem } = item;

      return {
        ...finalItem,
        rating,
      };
    } catch (e) {
      throw e;
    }
  }

  async addItem(body: IItem) {
    try {
      const createdItem = await Items.create(body);

      return {
        createdItem,
      };
    } catch (e) {
      throw e;
    }
  }

  async createComment(
    id: string,
    { id: userId }: IUserTokenData,
    { comment }: IComment,
  ) {
    try {
      const item = await Items.findById(id);

      if (!item) throw new NotFoundError("Item not found!");

      const createdComment = await Comments.create({
        comment,
        user: userId,
        item: id,
      });

      item.comments?.push(createdComment.id);

      await item.save();

      return { message: "Comment created!" };
    } catch (e) {
      throw e;
    }
  }

  async addRating(
    id: string,
    { id: userId }: IUserTokenData,
    { rating }: IRating,
  ) {
    try {
      const item = await Items.findById(id).populate("usersRatings");

      if (!item) throw new NotFoundError("Item not found!");

      const userRatingExist = (
        item.userRatings as unknown as IRatingModel[]
      ).find((userRating) => (userRating.user as unknown as string) == userId);

      if (userRatingExist)
        throw new BadRequestError("Users rating already exist!");

      const createdComment = await Rating.create({
        rating,
        user: userId,
        item: id,
      });

      (item.rating as number) += rating;
      item.userRatings?.push(createdComment.id);

      await item.save();

      return { message: "Comment created!" };
    } catch (e) {
      throw e;
    }
  }
}
