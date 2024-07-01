import mongoose from "mongoose";
import { ICart } from "../interface/cart.interface";

const cartSchema = new mongoose.Schema<ICart>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    products: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },

    quantity: {
      type: Number,
      default: 1,
    },

    // products: [
    //     {
    //       productId: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "products",
    //       },
    //       quantity: {
    //         type: Number,
    //         default: 1,
    //       },
    //     },
    //   ],
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

export default mongoose.model("carts", cartSchema);
