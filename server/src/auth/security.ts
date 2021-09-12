//Implements security functions

import bcryptjs from "bcryptjs";
import passport from "passport";
import crypto from "crypto";
import { RequestHandler } from "express";

import { IUser } from "../models/userModel";

import Blacklist from "../models/blacklistModel";

export interface Body {
  [key: string]: string;
}

export const sanitizeBody: (obj: Body, ...allowed: string[]) => Body = (
  obj: Body,
  ...allowed: string[]
) => {
  const sanitizedObject: Body = {} as Body;
  Object.keys(obj).forEach((el: string) => {
    if (allowed.includes(el)) {
      sanitizedObject[el] = obj[el];
    }
  });
  return sanitizedObject;
};

export const hashPassword = async (
  rounds: number,
  password: string
): Promise<string | undefined> => {
  try {
    const salt: string = await bcryptjs.genSalt(rounds);
    const hashedPassword: string = await bcryptjs.hash(password, salt);
    return hashedPassword;
  } catch (err) {
    return undefined;
  }
};

export const generatePasswordResetToken = (): string => {
  const currentDate: string = new Date().valueOf().toString();
  const randomInt: string = Math.random().toString();
  const hash: string = crypto
    .createHash("sha256")
    .update(currentDate + randomInt)
    .digest("hex");
  return hash;
};

export const authenticateUser = passport.authenticate("jwt", {
  session: false,
});

export const authenticateToken: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  const blacklistedToken = await Blacklist.findOne({ token: token });
  if (blacklistedToken)
    return res.status(403).json({ msg: "Invalid or expired token" });
  return next();
};

export const isActive: RequestHandler = async (req, res, next) => {
  const user = req.user as IUser;
  if (!user.active)
    return res
      .status(403)
      .json({ msg: "You must activate your account to access this resource" });

  return next();
};

export const restrictTo = (...roles: string[]): RequestHandler => {
  return (req, res, next) => {
    const role: string = (req.user as IUser).role;
    if (!roles.includes(role))
      return res
        .status(403)
        .json({ msg: "Current account not authorized for this account" });
    return next();
  };
};
