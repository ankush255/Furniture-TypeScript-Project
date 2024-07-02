// src/models/favorite.model.ts

import mongoose from 'mongoose';
import { IFavorite } from '../interface/favorite.interface';

const favoriteSchema = new mongoose.Schema<IFavorite>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users', 
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products', 
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('Favorite', favoriteSchema);
