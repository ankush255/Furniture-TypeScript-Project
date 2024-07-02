import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model'; 
import { IUser } from '../interface/user.interface';
import { ObjectId } from 'mongoose';
// Global Variable
declare global {
    namespace Express {
      interface Request {
        user?: IUser;
      }
    }
  }

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let authorization = req.headers['authorization'] as string;
        
        if (!authorization) {
            return res.status(401).json({ message: 'Unauthorized User' });
        }
        
        let token = authorization.split(' ')[1];
        
        let decodedToken : any = jwt.verify(token, process.env.SECRET_KEY as string);
        let userId = decodedToken.userId as ObjectId;
        
        let user = await User.findById(userId);
        
        if (user) {
            req.user = user as IUser;
            next();
        } else {
            res.status(404).json({ message: 'User Not Found' });
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default verifyToken;
