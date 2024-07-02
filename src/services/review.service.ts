import ReviewModel from '../models/review.model';
import { IReview } from '../interface/review.interface';
import mongoose, { ObjectId } from 'mongoose';

export default class ReviewServices {
    async addNewReview(body: object) {
        try {
            return await ReviewModel.create(body);
        } catch (error) {
            console.log(error);
            return error;
        }
    }

        async getAllReview(query: any, userId: ObjectId) {
            try {
              // Pagination
              let pageNo: number = Number(query.pageNo || 1);
              let perPage: number = Number(query.perPage || 5);
              let skip: number = (pageNo - 1) * perPage;
        
              let reviewItem =
                query.reviewId && query.reviewId !== ""
                  ? [
                      {
                        $match: { _id: new mongoose.Types.ObjectId(query.reviewId) },
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
                ...reviewItem,
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
        
              let results : IReview[] = await ReviewModel.aggregate(pipeline);
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
    

    async getReview(body: object) {
        try {
            return await ReviewModel.findOne(body);
        } catch (error) {
            console.log(error);
            return error;
        }
      }

    async updateReview(id:ObjectId, body: object) {
        try {
            let updateReview = await ReviewModel.findByIdAndUpdate(
                id,
                {
                    $set: body,
                },{
                    new : true,
                }
            );
            return updateReview;
                } catch (error) {
            console.log(error);
            return error;
        }
    }
}
