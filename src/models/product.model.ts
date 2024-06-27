import mongoose from "mongoose";
import { IProduct } from "../interface/product.interface";

const productSchema = new mongoose.Schema<IProduct>({
    title:{
        type: String,
        unique: true
    },
    price:{
        type: Number,
    },
    quantity:{
        type: Number,
    },
    product_Image:{
        type: String,
    },
    warranty:{
        type: String,
    },
    brand:{
        type: String,
        enum:["VIP","Homeify","Chairable","Skyrise"],
    },
    rating:{
        type: Number
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


export default mongoose.model('products',productSchema);