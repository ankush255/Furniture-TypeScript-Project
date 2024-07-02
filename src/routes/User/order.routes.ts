import express from 'express';
import verifyToken from "../../helper/verifyToken";
import { createNewOrder, getAllOrder, removeOrder } from "../../controller/User/order.controller";

const orderRoutes = express.Router();

orderRoutes.use(verifyToken);
orderRoutes.post('/create', createNewOrder);
orderRoutes.get('/show', getAllOrder);
orderRoutes.delete('/remove', removeOrder);

export default orderRoutes;
