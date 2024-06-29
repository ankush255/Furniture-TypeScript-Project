// controllers/favoriteController.ts

import { Request, Response } from 'express';
import { IFavorite } from '../../interface/favorite.interface';
import { IUser } from '../../interface/user.interface';
import FavoriteServices from "../../services/favorite.service"; 
import { ObjectId } from 'mongoose';
const favoriteService = new FavoriteServices();

// Global Variable
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}



export const addNewFavorite = async (req: Request, res: Response) => {
  try {
    const favorite = await favoriteService.getFavorite({
      product: req.body.product,
      user:req.user?._id,
      isDelete: false,
    }) as IFavorite;

    if (favorite) {
      res.status(400).json({ Message: "Favorite already exists" });
      return;
    }

    const newFavorite = (await favoriteService.addNewFavorite(
      {...req.body,
      user: req.user?._id,}
    )) as IFavorite;

    res.status(201).json({ favorite: newFavorite, Message: "Favorite added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Message: "Internal server error" });
  }
};



export const getAllFavorites = async (req: Request, res: Response) => {
  try {
    const favorites = (await favoriteService.getAllFavorite(req.query, 
    req.user?._id as ObjectId
    )) as IFavorite;
    
    if (!favorites) {
      res.json({ message: "User has no favorite items" });
      return;
    }

    console.log(favorites);
    res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ Message: "Internal server error" });
  }
};

export const deleteFavorites = async (req: Request, res: Response) => {
  try {
    const favorite = await favoriteService.updateFavorite(req.query, req.user?._id as ObjectId
    ) as IFavorite;
    res.status(202).json({ favorite, Message: "Favorite deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Message: "Internal server error" });
  }
};

