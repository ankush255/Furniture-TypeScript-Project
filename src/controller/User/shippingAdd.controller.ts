import { Request, Response } from "express";
import ShippingAddressService from "../../services/shippingAdd.service";
import { IShippingAddress } from "../../interface/shippingAdd.interface";

const shippingAddressService = new ShippingAddressService();

export const createShippingAdd = async (req: Request, res: Response) => {
  const {
    productId,
    fullName,
    mobileNo,
    shippingAdd,
    pinCode,
    country,
    state,
    city,
  } = req.body;

  try {
    const userId = req.user?._id as object;
    const shippingAddressData= {
      productId,
      fullName,
      mobileNo,
      shippingAdd,
      pinCode,
      country,
      state,
      city,
    } as IShippingAddress;

    const newShippingAddress = await shippingAddressService.newShippingAdd(
      shippingAddressData,
      userId as any,
    ) as IShippingAddress;
    res.json(newShippingAddress);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

export const getAllShippingAdd = async (req: Request, res: Response) => {
  try {
    const results = await shippingAddressService.getAllShippingAdd(
      req.query,
      req.user?._id as any
    ) as IShippingAddress[];

    if (!results || results.length === 0) {
      return res.json({ message: "User has no shipping addresses." });
    }
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removeShippingAdd = async (req: Request, res: Response) => {
  try {
    const results = await shippingAddressService.removeShippingAdd(
      req.query,
      req.user?._id as any
    );
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
