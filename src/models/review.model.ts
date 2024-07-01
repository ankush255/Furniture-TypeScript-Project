import mongoose from 'mongoose';
import { IReview } from '../interface/review.interface';

const reviewSchema = new mongoose.Schema<IReview>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    rating: {
        type: Number
    },
    comment: {
        type: String
    },
    isDelete: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true,
    versionKey: false
});

export default mongoose.model<IReview>('Review', reviewSchema);
