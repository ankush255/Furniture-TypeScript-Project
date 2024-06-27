import express, { Request, Response } from "express";
import { upload } from "../../helper/imageUpload";
import verifyToken from "../../helper/verifyToken";
import { 
    registerUser,
    loginUser,
    getProfile,
    getAllUser,
    updateProfile,
    changePassword,
    deleteUser    
 } from "../../controller/User/user.controller";

const userRoutes = express.Router();

userRoutes.post("/create", upload.single("profileImage"), registerUser);

userRoutes.post("/login", loginUser);

userRoutes.get("/profile", verifyToken, getProfile);

userRoutes.get("/allprofile", verifyToken, getAllUser);

userRoutes.put("/update", verifyToken, updateProfile);

userRoutes.put("/Change-Password", verifyToken,changePassword);

userRoutes.delete("/delete", verifyToken, deleteUser);

export default userRoutes;
