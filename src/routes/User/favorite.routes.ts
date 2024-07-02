import express from "express";
import  verifyToken  from "../../helper/verifyToken";
import { 
     addNewFavorite,
     getAllFavorites, 
     deleteFavorites,
 } from "../../controller/User/favorite.controller";
const favouriteRoutes = express.Router();

favouriteRoutes.post('/create', verifyToken, addNewFavorite);
favouriteRoutes.get('/get', verifyToken, getAllFavorites);
favouriteRoutes.delete('/delete', verifyToken, deleteFavorites);

export default favouriteRoutes