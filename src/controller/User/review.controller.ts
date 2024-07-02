import { Request, Response } from 'express';
import ReviewServices from '../../services/review.service';
import { IReview } from '../../interface/review.interface';
import { IUser } from '../../interface/user.interface';
import { ObjectId } from 'mongoose';

const reviewService = new ReviewServices();


// Global Variable
declare global {
    namespace Express {
      interface Request {
        user?: IUser;
      }
    }
  }
export const addReview = async (req: Request, res: Response) => {
    try {
        let review = await reviewService.getReview({
            user: req.user?._id,
            product: req.query.productId,
            isDelete: false
        }) as IReview;

        if (review) {
             res.status(400).json({ message: `You already reviewed this product` });
        }

        review = await reviewService.addNewReview({ ...req.body, user: req.user?._id }) as IReview;

        res.status(201).json({ review, message: `Your review has been submitted successfully.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Internal Server Error...` });
    }
};

export const getAllReview = async (req: Request, res: Response) => {
    try {
        const reviews = await reviewService.getAllReview(req.query,
            req.user?._id as ObjectId
        ) as IReview[];

        if (!reviews || reviews.length === 0) {
            res.status(404).json({ message: `Review Not Found....` });
        }

        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Internal Server Error...` });
    }
};


export const updateReview = async (req: Request, res: Response) => {
    try {
        const Id = req.params.id as any;
        let review = await reviewService.getReview(Id);

        if (!review) {
            res.status(404).json({ message: `This Review does not exist!` });
        }

        review = await reviewService.updateReview(
            Id,{
                ...req.body,
                isDelete: false,
            }) as IReview;

        res.status(200).json({ review, message: `Product Review Updated Successfully....` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Internal Server Error...` });
    }
};

export const deleteReview = async (req: Request, res: Response) => {
    try {
        const Id = req.params.id as any;
        let review = await reviewService.getReview(Id) as IReview;

        if (!review) {
            res.status(404).json({ message: `This Review does not exist!` });
        }

        review = await reviewService.updateReview(
            Id,
            { 
                isDelete: true
            }) as IReview;

        res.status(200).json({ review , message: `The product review has been deleted successfully.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Internal Server Error...` });
    }
};
