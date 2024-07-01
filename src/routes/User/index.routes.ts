import express from "express";

const appRoutes = express.Router();

import userRoutes from "./user.routes";
import cartRoutes from "./cart.routes";
import favouriteRoutes from "./favorite.routes";
import reviewRoutes from "./review.routes";
// import orderRoutes from "./order.routes";
import shippingAddressRoutes from "./shippingAdd.routes";


appRoutes.use("/user", userRoutes);
appRoutes.use("/cart",cartRoutes);
appRoutes.use("/favorite",favouriteRoutes);
appRoutes.use("/review", reviewRoutes);
// appRoutes.use("/order", orderRoutes);
appRoutes.use("/shippingAdd", shippingAddressRoutes);

export default appRoutes;