import mongoose, { Document, Model } from 'mongoose';

import User from '../../entities/User';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
    },
    cpf: {
      type: String,
    },

    created_at: {
      type: String,
    },
    updated_at: {
      type: String,
    },
  },

  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

interface IUserModel extends Omit<User, 'id'>, Document {}
export const UserSchema: Model<IUserModel> = mongoose.model('User', schema);
