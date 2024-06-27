import express from "express";

const appRoutes = express.Router();

import userRoutes from "./user.routes";


appRoutes.use("/user", userRoutes);

export default appRoutes;