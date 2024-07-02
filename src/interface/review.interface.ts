import { ObjectId } from "mongoose";


export interface IReview extends Document {
    user: ObjectId;
    product: ObjectId;
    rating?: number;
    comment?: string;
    isDelete?: boolean;
}