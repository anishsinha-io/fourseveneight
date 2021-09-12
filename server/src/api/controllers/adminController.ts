//Implements controllers for admin api endpoints

import { RequestHandler } from "express";

import User, { IUser } from "../../models/userModel";
import Post from "../../models/postModel";
import Comment from "../../models/commentModel";

//users

export const _getAllUsers: RequestHandler = async (_, res) => {
  try {
    const users = await User.find();
    if (!users) return res.status(404).json({ msg: "No users found!" });
    return res.status(200).json({ users });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const _getUser: RequestHandler = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ msg: "No user found!" });
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const _deactivateUser: RequestHandler = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ msg: "User not found!" });
    user.deleted = true;
    await user.save();
    return res.status(204).json({ msg: "Account successfully deactivated!" });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

//comments

export const _getAllComments: RequestHandler = async (_, res) => {
  try {
    const comments = await Comment.find();
    if (!comments) return res.status(404).json({ msg: "No comments found!" });
    return res.status(200).json({ comments });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const _getAllUserComments: RequestHandler = async (req, res) => {
  try {
    const user: IUser = (await User.findOne({
      username: req.params.username,
    })) as IUser;
    const userId = user.id;
    if (!userId) return res.status(404).json({ msg: "User not found" });
    const comments = await Comment.find({ user: userId });
    if (!comments) return res.status(404).json({ msg: "No comments found" });
    return res.status(200).json({ comments });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const _deactivateAllUserComments: RequestHandler = async (req, res) => {
  try {
    const user: IUser = (await User.findOne({
      username: req.params.username,
    })) as IUser;
    const userId = user.id;
    if (!userId) return res.status(404).json({ msg: "No user found!" });
    const comments = await Comment.updateMany(
      { user: userId },
      { deleted: true },
      { new: true }
    );
    if (!comments)
      return res.status(404).json({ msg: "No comments to delete" });
    return res.status(204).json({ msg: "Comments successfully deactivated!" });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

//posts

export const _deactivateAllUserPosts: RequestHandler = async (req, res) => {
  try {
    const user: IUser = (await User.findOne({
      username: req.params.username,
    })) as IUser;
    const userId = user.id;
    if (!userId) return res.status(404).json({ msg: "No user found!" });
    const posts = await Post.find({ user: user.id });
    if (!posts) return res.status(404).json({ msg: "No posts found!" });
    await Post.updateMany({ user: user.id }, { deleted: true }, { new: true });
    return res.status(204).json({ msg: "Posts successfully deleted!" });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};
