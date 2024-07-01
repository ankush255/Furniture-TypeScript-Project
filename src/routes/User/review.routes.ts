import express from "express";
import  verifyToken  from "../../helper/verifyToken";
import { 
     addReview,
     getAllReview, 
     updateReview,
     deleteReview,
 } from "../../controller/User/review.controller";
const reviewRoutes = express.Router();

reviewRoutes.post('/create', verifyToken, addReview);
reviewRoutes.get('/get', verifyToken, getAllReview);
reviewRoutes.put('/update/:id', verifyToken, updateReview);
reviewRoutes.delete('/delete/:id', verifyToken, deleteReview);

export default reviewRoutes