import { ObjectId } from "mongoose";

export interface IProduct{
    _id?:ObjectId;
    title?:string;
    price?: Number;
    quantity?: Number;
    product_Image?: string;
    warranty?: string;
    brand?: string;
    rating?: Number;
    isDelete?: boolean;
}