// Service/FavoriteServices.ts

import { IFavorite } from '../interface/favorite.interface';
import FavoriteModel from '../models/favorite.model';
import mongoose, { ObjectId } from 'mongoose';


export default class FavoriteServices {
  // ADD NEW FAVORITE
  async addNewFavorite(body: object) {
    try {
      return await FavoriteModel.create(body);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  // GET ALL FAVORITE
  async getAllFavorite(query: any, userId: ObjectId) {
    try {
      // Pagination
      let pageNo: number = Number(query.pageNo || 1);
      let perPage: number = Number(query.perPage || 5);
      let skip: number = (pageNo - 1) * perPage;

      let favoriteItem =
        query.favoriteId && query.favoriteId !== ""
          ? [
              {
                $match: { _id: new mongoose.Types.ObjectId(query.favoriteId) },
              },
            ]
          : [];
      let loginUser =
        query.me && query.me === "true"
          ? [
              {
                $match: { user:(userId) },
              },
            ]
          : [];
      let pipeline = [
        {
          $match: { isDelete: false },
        },
        ...loginUser,
        ...favoriteItem,
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
            pipeline: [
              {
                $project: {
                  fullName: 1,
                  email: 1,
                  profileImage: 1,
                },
              },
            ],
          },
        },
        {
          $set: { user: { $first: "$user" } },
        },
        {
          $lookup: {
            from: "products",
            localField: "product",
            foreignField: "_id",
            as: "product",
            pipeline: [
              {
                $project: {
                  title: 1,
                  price: 1,
                  product_image: 1,
                },
              },
            ],
          },
        },
        {
          $set: { "product": { $first: "$product" } },
        },
        {
          $skip: skip,
        }, 
        {
          $limit: perPage,
        },
      ];

      let results : IFavorite[] = await FavoriteModel.aggregate(pipeline);
      let totalPages : number = Math.ceil(results.length / perPage);

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

  // UPDATE FAVORITE
  async updateFavorite(query: any, userID: ObjectId) {
    try {
      let updateFavorite = await FavoriteModel.findOneAndUpdate(
        {
          user: (userID),
          isDelete: false,
        },
        {
          isDelete: true,
        },
        {
          new: true,
        }
      ); 
      return updateFavorite;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  // GET SPECIFIC FAVORITE
  async getFavorite(body: any) {
    try {
      return await FavoriteModel.findOne(body);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
