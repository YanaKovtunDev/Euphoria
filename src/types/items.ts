import { ObjectId } from "mongoose";

export interface IItem {
  type: string;
  price: number;
  color: string;
  size: string[];
  photo?: string;
  style: string;
  rating?: number;
  comments?: ObjectId[];
  userRatings?: ObjectId[];
}

export interface GetQueryParams {
  size?: string;
  minPrice?: number;
  maxPrice?: number;
  color?: string;
  type?: string;
  page?: number;
  limit?: number;
}

export interface IComment {
  comment: string;
}

export interface ICommentModel extends IComment {
  user: ObjectId;
  item: ObjectId;
}

export interface IRating {
  rating: number;
}

export interface IRatingModel extends IRating {
  user: ObjectId;
  item: ObjectId;
}
