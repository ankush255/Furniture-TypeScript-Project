import express from "express";
import  verifyToken from "../../helper/verifyToken";
const cartRoutes = express.Router();
import {
    addNewCart,
    getAllCarts,
    updateCart,
    deleteCart
} from '../../controller/User/cart.controller';

cartRoutes.post('/create',verifyToken, addNewCart);
cartRoutes.get('/get',verifyToken, getAllCarts);
cartRoutes.put('/update/:id', updateCart);
cartRoutes.delete('/delete/:id', deleteCart);

export default cartRoutes;