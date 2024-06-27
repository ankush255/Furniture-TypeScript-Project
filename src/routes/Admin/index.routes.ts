import  express from "express";
const adminRoutes = express.Router();


import productRoutes from "./product.routes";



adminRoutes.use("/product",productRoutes);



export default adminRoutes;