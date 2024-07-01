import { Request, Response } from "express";
import { ICart } from "../../interface/cart.interface";
import { IUser } from "../../interface/user.interface";
import CartServices from "../../services/cart.service";
const cartService = new CartServices();

// Global Variable
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const addNewCart = async (req: Request, res: Response) => {
  try {
    let cart = (await cartService.getCart({
      user: req.user?._id,
      products: req.query.productId,
      isDelete: false,
    })) as ICart;
    // console.log(cart);
    if (cart) {
      return res.json({ message: "Cart is already added" });
    }
    
    cart = (await cartService.addNewCart({
      user: req.user?._id,
      products: req.body.productId,
      quantity: req.body.quantity || 1,
    })) as ICart;

    res.status(201).json({ cart , message: "Cart Added" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal Server Error" });
  }
};

// export const addNewCart = async (req: Request, res: Response) => {
//   try {
//     let cart = await cartService.getCart({
//       user: req.user?._id,
//       isDelete: false,
//     }) as ICart;

//     // console.log(cart.products);
//     // console.log(cart);

//     if (cart) {
//       let findProductIndex : number | undefined = cart.products?.findIndex(
//         (item : ICart) => String(item.productId) === req.body.productId
//         );
//         console.log(cart.products);

//         console.log(cart.products?[findProductIndex].quantity);

//         if (findProductIndex !== -1) {
//           cart.products?[findProductIndex].quantity += req.body.quantity || 1;
//         } else {
//             cart.product?.push({
//             productId: req.body.productId,
//             quantity: req.body.quantity || 1,
//             });
//           }
//       return res.json({ message: "Cart added success...." });
//     }
//     let newCart = (await cartService.addNewCart({
//       user: req.user?._id,
//       products: [
//         {
//           productId: req.body.productId,
//           quantity: req.body.quantity || 1,
//         },
//       ],
//     })) as ICart;

//   res.status(201).json({ cart: newCart, message: "Cart Added" });
//   } catch (error) {
//     console.log(error);
//     res.json({ message: "Internal Server Error" });
//   }
// };

export const getAllCarts = async (req: Request, res: Response) => {
  try {
    let carts = (await cartService.getAllCarts(
      req.query,
      req.user?._id
    )) as ICart[];

    if (!carts) {
      return res.json({ message: "cart is not found" });
    }

    res.json(carts);
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal Server Error" });
  }
};

export const updateCart = async (req: Request, res: Response) => {
  try {
    const Id = req.params.id as any;

    const cart = (await cartService.getCart(
      Id
    )) as ICart[];

    if (!cart) {
      return res.json({ message: "Cart is not found" });
    }

    const updateCart = (await cartService.updateCart(Id,{
      ...req.body,
      isDelete : false,
    })) as ICart;

    res.json({ cart: updateCart, message: "Cart is updated...." });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal Server Error" });
  }
};


export const deleteCart = async(req:Request, res:Response) => {
  try {
    const Id = req.params.id as any;
    let cart = await cartService.getCart(Id) as ICart;

    if(!cart){
      res.status(404).json({ message: "This Cart Does Not Exixst...."});
    }

    cart = await cartService.updateCart(
      Id,{
        isDelete: true
      }) as ICart;

      res.status(200).json({ cart , message : "This Cart is Deleted..."});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error..."});
  }
}
