import mongoose, { ObjectId } from 'mongoose';

export interface IShippingAddress {
    user: ObjectId;
  products: any[];
  productId: ObjectId;
  fullName: string;
  mobileNo: number;
  shippingAdd: string;
  pinCode: number;
  country: string;
  state: string;
  city: string;
  isDelete: boolean;
}
