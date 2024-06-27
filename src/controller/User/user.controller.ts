import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserService from '../../services/user.service';
import { IUser } from '../../interface/user.interface';
import { ObjectId } from 'mongoose';

const userService = new UserService();

// Global Veriable
declare global{
    namespace Express {
        interface Request {
            user? : IUser;
        }
    }
}

export const registerUser = async (req: Request, res: Response) => {
    try {
        const {
            fullName,
            email,
            mobileNo,
            password,
            profileImage,
            DOB,
            gender,
            country,
            state,
            city,
        } = req.body;

        // Checking Already Register or Not
        let user = await userService.findOneUser({ email: email, isDelete: false });

        if (user) {
            return res.json({ message: "You are Already Registered....." });
        }

        // Image Store
        let image = "";
        if (req.file)
            image = req.file.path.replace(/\\/g, '/');

        // Encrypt Password
        let hashPassword = await bcrypt.hash(password, 10);

        // Create New User
        user = await userService.createUser({
            fullName,
            email,
            mobileNo,
            password: hashPassword,
            profileImage: image,
            DOB,
            gender,
            country,
            state,
            city,
        });

        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        let user = (await userService.findOneUser({
            email: req.body.email,
            isDelete: false,
          })) as IUser;

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        let matchedPassword = await bcrypt.compare(req.body.password, user.password as string);

        if (!matchedPassword) {
            return res.json({ message: "Password is Not Matched...." });
        }

        let token: string = jwt.sign({ userId: user._id }, process.env.SECRET_KEY as string);
        res.json({ token, message: "Login Success" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getProfile = async (req: Request, res: Response) => {
    try {
        let userProfile = req.user;
        res.json(userProfile);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getAllUser = async (req: Request, res: Response) => {
    try {
        const users = await userService.findAllUser({ isDelete: false });
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateProfile = async (req: Request, res: Response) => {
    try {
        let user = (await userService.getUserById(
            req.user?._id as ObjectId
        )) as IUser;

        if(!user){
            return res.json({ message: "User Not Found"});
        }

        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        let updateUser =(await userService.updateUser(user._id as ObjectId,{
            ...req.body,
        })) as IUser;
        res.status(200).json({ updateUser, message: "Update Success" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const changePassword = async (req: Request, res: Response) => {
    try {
        let user = (await userService.getUserById(
            req.user?._id as ObjectId
          )) as IUser;
        const { oldPassword, newPassword, confirmPassword } = req.body;

        if (oldPassword === newPassword) {
            res.json({ message: "Your Password Allready Used...." });
        }
        if (newPassword !== confirmPassword) {
            res.json({ message: "newPassword An confirmPassword Doesn't Match...." });
        }

        let hashPassword = await bcrypt.hash(newPassword, 10);

        await userService.updateUser(user._id as ObjectId, { password: hashPassword });

        res.json({ user, message: "Update Success" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        let user = (await userService.getUserById(
            req.user?._id as ObjectId
          )) as IUser;

        user = await userService.updateUser(req.user?._id as ObjectId, { isDelete: true }) as IUser;

        res.json({ user, message: "Delete Success" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
