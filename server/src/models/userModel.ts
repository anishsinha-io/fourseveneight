//Implements database schema for users

import { Schema, model } from "mongoose";

//(abstract) User interface
export interface IUser {
  id: Schema.Types.ObjectId;
  photo?: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  active: boolean;
  date: Date;
  resetPasswordToken: string | undefined;
  resetPasswordSentAt: number | undefined;
  deleted: boolean;
  role: string;
  onboarded?: boolean;
}

export interface IUserResponse {
  id: Schema.Types.ObjectId | string;
  username: string;
  active: boolean;
  deleted: boolean;
  role: string;
}

//User schema
const userSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  onboarded: {
    type: Boolean,
    default: false,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: {
    type: String,
    default: undefined,
  },
  resetPasswordSentAt: {
    type: Number,
    default: undefined,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["user", "admin", "root"],
    default: "user",
  },
});

const User = model<IUser>("User", userSchema);

export default User;
