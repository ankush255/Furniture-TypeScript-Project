import Order from "../models/order.model";
import { IOrder } from "../interface/order.interface";
import mongoose, { ObjectId } from "mongoose";

class OrderServices {
  // Create New Order
  async newOrder(
    body: { products: ObjectId; totalAmount: number },
    userID: ObjectId
  ) {
    try {
      return await Order.create({
        user: userID,
        products: body.products,
        totalAmount: body.totalAmount,
      });
    } catch (err) {
      console.log(err);
      return err ;
    }
  }

  // Get All Orders
  async getAllOrder(query: any, userID: ObjectId) {
    try {
      // Pagination
      let pageNo: number = Number(query.pageNo || 1);
      let perPage: number = Number(query.perPage || 4);
      let skip: number = (pageNo - 1) * perPage;

      let orderItem = query.orderId
        ? [{ $match: { _id: new mongoose.Types.ObjectId(query.orderId) } }]
        : [];
      let loginUser = query.me === "true" ? [{ $match: { user: userID } }] : [];

      let pipeline = [
        { $match: { isDelete: false } },
        ...loginUser,
        ...orderItem,
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
            pipeline: [{ $project: { firstName: 1, lastName: 1, email: 1 } }],
          },
        },
        { $set: { user: { $first: "$user" } } },
        { $unwind: "$products" },
        {
          $lookup: {
            from: "products",
            localField: "products.productId",
            foreignField: "_id",
            as: "products.productId",
            pipeline: [{ $project: { title: 1, price: 1 } }],
          },
        },
        { $set: { "products.productId": { $first: "$products.productId" } } },
        {
            $skip: skip,
          },
          {
            $limit: perPage,
          },
      ];

      let results: IOrder[] = await Order.aggregate(pipeline);
      let totalPages: number = Math.ceil(results.length / perPage);

      let orders = await Order.aggregate(pipeline);
      let totalAmount = orders
        .map((item: any) => ({
          quantity: item.products.quantity,
          price: item.products.productId.price,
        }))
        .reduce(
          (total: number, item: any) => total + item.quantity * item.price,
          0
        );
      let discountAmount = totalAmount * 0.05;
      let GST = totalAmount * 0.18;
      totalAmount -= discountAmount + GST;

      return {
        totalCounts: results.length,
        totalPages: totalPages,
        currentPage: pageNo,
        result: results, 
        orders, 
        GST, 
        discount: discountAmount, 
        totalAmount 
    };
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  // Remove Order
  async removeOrder(query: any, userID: ObjectId) {
    try {
      return await Order.findOneAndUpdate(
        { user: userID, isDelete: false },
        { isDelete: true },
        { new: true }
      );
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

export default OrderServices;
