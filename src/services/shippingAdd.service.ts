import ShippingAdd from "../models/shippingAdd.model";
import mongoose from "mongoose";
import { IShippingAddress } from "../interface/shippingAdd.interface";

class ShippingAddressService {
  async newShippingAdd(shippingAddressData: IShippingAddress,userID: string){
    try {
      return await ShippingAdd.create({
        user: userID,
        products: [shippingAddressData],
      });
    } catch (err) {
        console.log(err);
        return err;
    }
  }

  async getAllShippingAdd(query: any,userID: string) {
    try {
        // Pagination
      let pageNo: number = Number(query.pageNo || 1);
      let perPage: number = Number(query.perPage || 4);
      let skip: number = (pageNo - 1) * perPage;

      const orderItem =
        query.orderId && query.orderId !== ""
          ? [
            { 
                $match: { _id: new mongoose.Types.ObjectId(query.orderId) } 
            },
        ]
          : [];
      const loginUser =
        query.me && query.me === "true" 
        ? [
            { 
                $match: { user: userID },
             },
            ] 
            : [];
      const pipeline = [
        { 
            $match: { isDelete: false } 
        },
        ...loginUser,
        ...orderItem,
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
            pipeline: [
                { 
                    $project: { 
                        firstName: 1, 
                        lastName: 1, 
                        email: 1 
                    },
                 },
                ],
          },
        },
        { 
            $set: { user: { $first: "$user" } } 
        },
        { 
            $unwind: "$products" 
        },
        {
          $lookup: {
            from: "products",
            localField: "products.productId",
            foreignField: "_id",
            as: "products.productId",
            pipeline: [
                { 
                    $project: { 
                        title: 1, 
                        price: 1 
                    },
                 },
                ],
          },
        },
        { 
            $set: { "products.productId": { $first: "$products.productId" } },
         },
         {
            $skip: skip,
          },
          {
            $limit: perPage,
          },
      ];

      let results: IShippingAddress[] = await ShippingAdd.aggregate(pipeline);
      let totalPages: number = Math.ceil(results.length / perPage);

      return {
        totalCounts: results.length,
        totalPages: totalPages,
        currentPage: pageNo,
        result: results,
    };
    } catch (err) {
        console.log(err);
        return err;
    }
  }

  async removeShippingAdd(query: any,userID: string) {
    try {
      const removeShipping = await ShippingAdd.findOneAndUpdate(
        { 
            user: userID, 
            isDelete: false 
        },
        { 
            isDelete: true 
        },
        { 
            new: true 
        }
      );
      return removeShipping;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

export default ShippingAddressService;
