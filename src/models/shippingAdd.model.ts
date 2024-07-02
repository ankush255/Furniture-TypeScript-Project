import mongoose, { Schema } from "mongoose";
import { IShippingAddress } from "../interface/shippingAdd.interface";

const ShippingAddSchema: Schema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      products: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
          },
          fullName: {
            type: String,
          },
          mobileNo: {
            type: Number,
          },
          shippingAdd: {
            type: String,
          },
          pinCode: {
            type: Number,
          },
          country: {
            type: String,
          },
          state: {
            type: String,
          },
          city: {
            type: String,
          },
        },
    ],
        isDelete: {
          type: Boolean,
          default: false,
        },
      },
      {
        versionKey: false,
        timestamps: true,
      }
);

export default mongoose.model<IShippingAddress>(
  "Shipping_Address",
  ShippingAddSchema
);
