import { ObjectId } from "mongoose";

export interface ICart {
  _id?: ObjectId;
  user?: ObjectId;
  products?: object;
  productId?: ObjectId;
  quantity?: number;
  isDelete?: boolean;
}
