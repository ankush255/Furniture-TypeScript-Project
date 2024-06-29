import { ObjectId } from 'mongoose';

export interface IFavorite {
  user?: ObjectId;
  product?: ObjectId;
  isDelete?: boolean;
}
