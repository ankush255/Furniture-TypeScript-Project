import mongoose, { Schema } from "mongoose";
import { IOrder } from "../interface/order.interface";

const orderSchema: Schema = new Schema(
  {
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
        quantity: {
          type: Number,
        },
      },
    ],
    totalAmount: {
      type: Number,
    },
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

export default mongoose.model<IOrder>("orders", orderSchema);
