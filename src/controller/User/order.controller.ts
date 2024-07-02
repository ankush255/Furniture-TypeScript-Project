import { Request, Response } from "express";
import OrderServices from "../../services/order.service";
import CartServices from "../../services/cart.service";
import { IOrder } from "../../interface/order.interface";
import { ICart } from "../../interface/cart.interface";
import { ObjectId } from "mongoose";
import { IUser } from "../../interface/user.interface";

const orderServices = new OrderServices();
const cartServices = new CartServices();



// Global Variable
declare global {
    namespace Express {
        interface Request {
        user?: IUser;
      }
    }
  }

export const createNewOrder = async (req: Request, res: Response) => {
    try {
        let userCarts: any = await cartServices.getAllCarts(req.query, req.user?._id);
        if (userCarts.result === 0) {
            res.json({ message: "User Has No Cart Items...." });
            return;
        }
        // console.log(userCarts);

        let orderItems = userCarts.result.map((item: any) => ({
            quantity: item.quantity,
            price: item.products.price,
            productId: item.products._id,
        }));
        // console.log(orderItems);

        let totalAmount = orderItems.reduce(
            (total: number, item: any) => total + item.quantity * item.price,
            0
        );
        // console.log(totalAmount);
        
        let newOrder = await orderServices.newOrder(
            { products: orderItems, totalAmount },
            req.user?._id as ObjectId
        ) as IOrder;
        
        await cartServices.updateMany(req.user?._id as ObjectId,{isDelete: true}) as ICart;
        
        res.status(201).json({order: newOrder, message: 'New Order Created'});
    } catch (err) {
        console.error(err);
        res.json({ message: "Internal Server Error" });
    }
}

export const getAllOrder = async (req: Request, res: Response) => {
    try {
        let results = await orderServices.getAllOrder(req.query, req.user?._id as ObjectId) as any;
        if (!results || results.orders.length === 0) {
            res.json({ message: "User Has No Orders..." });
            return;
        }
        res.status(201).json(results);
    } catch (error) {
        console.error(error);
        res.json({ message: "Internal Server Error" });
    }
}

export const removeOrder = async (req: Request, res: Response) => {
    try {
        let results = await orderServices.removeOrder(req.query, req.user?._id as ObjectId) as IOrder;
        res.status(201).json(results);
    } catch (error) {
        console.error(error);
        res.json({ message: "Internal Server Error" });
    }
}
