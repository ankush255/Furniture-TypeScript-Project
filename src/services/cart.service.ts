import Cart from "../models/cart.model";
import { ICart } from "../interface/cart.interface";
import mongoose, { ObjectId } from "mongoose";

export default class CartServices {
  // Add New cart
  async addNewCart(body: object) {
    try {
      return await Cart.create(body);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  // Get cart
  async getCart(body: object) {
    try {
      return await Cart.findOne(body);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  // Get cart By Id
  async getCartByid(id: ObjectId) {
    try {
      return await Cart.findById(id);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  // update Cart
  async updateCart(id: ObjectId, body: object) {
    try {
      return await Cart.findByIdAndUpdate(id, { $set: body }, { new: true });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  // update Cart
  async updateMany(id: ObjectId, body: object) {
    try {
      return await Cart.updateMany({ user: id }, body);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  // Get All cart
  async getAllCarts(query: any, userId: any) {
    try {
      // Pagination
      let pageNo: number = Number(query.pageNo || 1);
      let perPage: number = Number(query.perPage || 4);
      let skip: number = (pageNo - 1) * perPage;

      let userCart =
        query.me && query.me === "true"
          ? [
              {
                $match: { user: userId },
              },
            ]
          : [];

      let cartItem =
        query.cartId && query.cartId !== ""
          ? [
              {
                $match: { _id: new mongoose.Types.ObjectId(query.cartId) },
              },
            ]
          : [];

      let find = [
        { $match: { isDelete: false } },
        ...cartItem,
        ...userCart,
        {
          $lookup: {
            from: "products",
            localField: "products",
            foreignField: "_id",
            pipeline: [
              {
                $project: {
                  title: 1,
                  price: 1,
                  category: 1,
                },
              },
            ],
            as: "products",
          },
        },
        { $set: { products: { $first: "$products" } } },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            pipeline: [
              {
                $project: {
                  fullName: 1,
                  email: 1,
                },
              },
            ],
            as: "user",
          },
        },
        { $set: { "user": { $first: "$user" } } },
        {
          $skip: skip,
        },
        {
          $limit: perPage,
        },
      ];

      let results: ICart[] = await Cart.aggregate(find);
      let totalPages: number = Math.ceil(results.length / perPage);

      return {
        totalCounts: results.length,
        totalPages: totalPages,
        currentPage: pageNo,
        result: results,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  }


  // Get All cart
  async getMyCarts(query: any, userId: any) {
    try {
      return await Cart.find({ user: userId, isDelete: false }).populate(
        "cartItem"
      );
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
