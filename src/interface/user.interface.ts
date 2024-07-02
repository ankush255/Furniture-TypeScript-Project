import { ObjectId } from "mongoose";


export interface IUser {
    _id?: ObjectId;
    fullName?: string;
    email: string;
    mobileNo?: string;
    password?: string;
    DOB?: Date;
    profileImage?: string;
    gender?: 'Male' | 'Female';
    country?: string;
    state?: string;
    city?: string;
    isDelete?: boolean;
}

