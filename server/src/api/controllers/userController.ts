//Implements controllers for user api endpoints

import { RequestHandler } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import User, { IUser } from "../../models/userModel";
import Blacklist from "../../models/blacklistModel";
import { IJwtPayload } from "../../auth/passport";
import * as security from "../../auth/security";
import Email from "../../util/Email";

export const registerUser: RequestHandler = async (req, res) => {
  try {
    const { firstName, lastName, email, username, password, passwordConfirm } =
      req.body;
    if (password !== passwordConfirm)
      return res.status(400).json({ msg: "Passwords do not match!" });
    let user = await User.findOne({ username: username });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "User with that username already exists!" }] });
    }
    user = new User({
      firstName,
      lastName,
      username,
      email,
      password,
    });
    const hash: string | undefined = await security.hashPassword(12, password);
    if (hash) user.password = hash;
    else
      return res
        .status(500)
        .json({ msg: "Unable to create your account at this time!" });

    await user.save();
    const confirmationUrl: string = `${req.protocol}://${req.get(
      "host"
    )}/api/confirm/`;
    const confirmationToken: string = user.id;
    //todo enable the following after testing frontend.
    // await new Email(user, confirmationUrl).sendAccountConfirmationEmail(
    //   confirmationToken
    // );
    const payload: IJwtPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    jwt.sign(
      payload,
      `${process.env.JWT_SECRET}`,
      { expiresIn: 3600 },
      (err: Error | null, token: string | undefined) => {
        return res.status(201).json({ token: `Bearer ${token}` });
      }
    );
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: "Internal server" }] });
  }
};

export const loginUser: RequestHandler = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username }).select("+password");
    if (!user) return res.status(404).json({ msg: "User not found!" });

    const isMatch = await bcryptjs.compare(password, user.password);
    if (isMatch) {
      const payload: IJwtPayload = {
        id: user.id,
        email: user.email,
        username: user.username,
      };
      jwt.sign(
        payload,
        `${process.env.JWT_SECRET}`,
        { expiresIn: 3600 },
        (err: Error | null, token: string | undefined) => {
          return res.status(200).json({ token: `Bearer ${token}` });
        }
      );
    } else {
      return res.status(403).json({ msg: "Username or password incorrect!" });
    }
  } catch (err) {
    return res.status(500).json({ msg: "Internal server" });
  }
};

export const getCurrentUser: RequestHandler = async (req, res) => {
  try {
    const user = req.user as IUser;
    return res
      .status(200)
      .json({ id: user.id, email: user.email, username: user.username });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server" });
  }
};

export const sendPasswordResetEmail: RequestHandler = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ msg: "User not found!" });
    const resetPasswordToken: string = security.generatePasswordResetToken();
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordSentAt = new Date().getTime();
    await user.save();
    const resetUrl: string = `${req.protocol}://${req.get(
      "host"
    )}/api/recover/`;
    await new Email(user, resetUrl).sendPasswordResetEmail(resetPasswordToken);
    return res.status(200).json({ msg: "Password recovery email sent" });
  } catch (err) {
    res.status(500).json({
      errors: [{ msg: "Internal server" }],
    });
  }
};

export const resetPassword: RequestHandler = async (req, res) => {
  try {
    const resetPasswordToken: string = req.params.resetToken;
    const user = await User.findOne({ resetPasswordToken: resetPasswordToken });
    if (!user) return res.status(404).json({ msg: "Invalid or expired token" });
    const { password, passwordConfirm } = req.body;
    if (password !== passwordConfirm)
      return res.status(400).json({ msg: "Passwords do not match!" });
    const currentTime: number = Date.now();
    if (!user.resetPasswordSentAt)
      return res.status(400).json({
        msg: "We are unable to process your request. Please request another reset link and try again.",
      });
    if (currentTime - user.resetPasswordSentAt >= 600000)
      return res.status(400).json({
        msg: "Invalid or expired token. Please request another reset link and try again.",
      });
    const hash: string | undefined = await security.hashPassword(12, password);
    if (hash) {
      user.password = hash;
      user.resetPasswordSentAt = undefined;
      user.resetPasswordToken = undefined;
      await user.save();
    } else
      return res.status(500).json({
        msg: "Unable to change password. Please request a new link and try again.",
      });
    return res.status(200).json({ msg: "Password updated successfully!" });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server" });
  }
};

export const logoutUser: RequestHandler = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const blacklistedToken = new Blacklist({ token: token });
    await blacklistedToken.save();
    return res
      .status(200)
      .json({ msg: "Logged out successfully.", blacklistedToken });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server" });
  }
};

export const confirmAccountEmail: RequestHandler = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user)
      return res.status(404).json({
        msg: "Invalid or incorrect token. We are unable to confirm your email at this time",
      });
    if (user.active === true)
      return res
        .status(400)
        .json({ msg: "Bad request: Email for this account already confirmed" });
    user.active = true;
    await user.save();
    return res.status(200).json({
      msg: "We successfully confirmed your email!",
    });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const resendConfirmationEmail: RequestHandler = async (req, res) => {
  try {
    const user = req.user as IUser;
    if (!user)
      return res
        .status(403)
        .json({ msg: "Must be logged in to access this resource" });

    if (user.active)
      return res
        .status(400)
        .json({ msg: "This email has already been confirmed!" });
    const confirmationUrl: string = `${req.protocol}://${req.get(
      "host"
    )}/api/confirm/`;
    const confirmationToken: string = user.id.toString();
    await new Email(user, confirmationUrl).sendAccountConfirmationEmail(
      confirmationToken
    );
    return res
      .status(200)
      .json({ msg: "Resent email to the email address on file." });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const deactivateAccount: RequestHandler = async (req, res) => {
  try {
    const user = req.user as IUser;
    if (!user)
      return res.status(400).json({
        msg: "Bad request: unable to deactivate account. Please try again",
      });
    if (user.deleted === true)
      return res.status(400).json({
        msg: "Bad request: account is already deactivated. Please try again",
      });
    const token = req.headers.authorization?.split(" ")[1];
    const blacklistedToken = new Blacklist({ token: token });
    await blacklistedToken.save();
    await User.findByIdAndUpdate(user.id, { deleted: true });
    return res.status(204).json({ msg: "Account deleted." });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const updateUser: RequestHandler = async (req, res) => {
  interface IUserUpdate {
    firstName?: string;
    lastName?: string;
    email?: string;
    active?: boolean;
  }
  try {
    const user = req.user as IUser;
    const updateObject = req.body as IUserUpdate;
    if (!("email" in updateObject)) {
      await User.findByIdAndUpdate(user.id, updateObject);
      return res
        .status(200)
        .json({ msg: "Account settings updated successfully." });
    }
    updateObject.active = false;
    const confirmationUrl: string = `${req.protocol}://${req.get(
      "host"
    )}/api/confirm/`;
    const confirmationToken: string = user.id.toString();

    await User.findByIdAndUpdate(user.id, updateObject);
    await new Email(user, confirmationUrl).sendAccountConfirmationEmail(
      confirmationToken
    );
    return res.status(200).json({
      msg: "Account settings successfully updated! Please check your email to confirm your new email.",
    });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const auth: RequestHandler = async (req, res) => {
  try {
    const user = await User.findById((req.user as IUser).id).select(
      "-password"
    );
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getUserByUsername: RequestHandler = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username: username });
    if (user) return res.status(200).json({ data: user });
    else return res.status(404).json({ data: "User not found" });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};
