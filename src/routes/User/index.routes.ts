import express from "express";

const appRoutes = express.Router();

import userRoutes from "./user.routes";
import cartRoutes from "./cart.routes";
import favouriteRoutes from "./favorite.routes";


appRoutes.use("/user", userRoutes);
appRoutes.use("/cart",cartRoutes)
appRoutes.use("/favorite",favouriteRoutes)

export default appRoutes;