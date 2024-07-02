import User from "../models/user.model";
import { IUser } from "../interface/user.interface";
import { ObjectId } from "mongoose";

export default class UserService {
  // Create user
  async createUser(body: any) {
    try {
      return await User.create(body);
    } catch (error) {
      return error;
    }
  }

  // Get One User
  async findOneUser(body: any) {
    try {
      return await User.findOne(body);
    } catch (error) {
      return error;
    }
  }

  // Get All User
  async findAllUser(body: any) {
    try {
      return await User.find(body);
    } catch (error) {
      return error;
    }
  }

  // get single User by id
  async getUserById(id:ObjectId) {
    try {
      return await User.findById(id);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  // Update User
  async updateUser(id: ObjectId, body: any) {
    try {
      return await User.findByIdAndUpdate(
        id,
        {
          $set: body,
        },
        {
          new: true,
        }
      );
    } catch (error) {
      return error;
    }
  }
}
