import { Document, ObjectId } from "mongoose";

export interface IOrder extends Document {
  user: ObjectId;
  products: ObjectId;
  totalAmount: number;
  isDelete: boolean;
}
