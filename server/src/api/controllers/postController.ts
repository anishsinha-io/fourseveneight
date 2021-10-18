//Implements controllers for post api endpoints

import { RequestHandler } from "express";
import slugify from "slugify";
import { ObjectId } from "mongoose";

import User, { IUser } from "../../models/userModel";
import Post, { IPost } from "../../models/postModel";

export const createPost: RequestHandler = async (req, res) => {
  try {
    const user = req.user as IUser;
    if (!user.active)
      return res.status(403).json({
        msg: "You must activate your account to access this resource!",
      });
    const { content, title, summary, imageAlt, tags, category } = req.body;
    const file = req.file;

    const parsedTags = JSON.parse(tags);

    const postFields = {
      user: user.id,
      image: `image-fse-${file?.filename}`,
      imageAlt,
      summary: summary,
      title: title,
      content: content,
      rootComments: [] as ObjectId[],
      likes: [] as ObjectId[],
      tags: parsedTags,
      category,
    } as IPost;

    const newPost = new Post(postFields);
    await newPost.save();

    return res.status(201).json({ newPost });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err });
  }
};

//todo refactor
export const deletePost: RequestHandler = async (req, res) => {
  try {
    const user = req.user as IUser;
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ msg: "Post not found" });
    if (user.id.toString() !== post.user.toString())
      return res
        .status(403)
        .json({ msg: "Current account not authorized for this action" });
    const updateObject = { deleted: true };
    await Post.findOneAndUpdate({ slug: req.params.slug }, updateObject);
    return res.status(204).json({ msg: "Post successfully deleted!" });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const updatePost: RequestHandler = async (req, res) => {
  try {
    const user: IUser = req.user as IUser;
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ msg: "Post not found" });
    if (user.id.toString() !== post.user.toString())
      return res
        .status(403)
        .json({ msg: "Current account not authorized for this action" });

    const { title, content, summary, imageAlt, tags, category } = req.body;

    const parsedTags = JSON.parse(tags);

    const slug = slugify(title, { lower: true });
    const file = req.file;
    let image;
    if (file) {
      image = `image-fse-${file?.filename}`;
    }

    await Post.findOneAndUpdate(
      { slug: req.params.slug },
      {
        title,
        content,
        summary,
        slug,
        image,
        imageAlt,
        tags: parsedTags,
        category,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(200).json({ msg: "Post successfully updated!" });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getPost: RequestHandler = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  if (!post || post.deleted === true)
    return res.status(404).json({ msg: "Post not found" });
  return res.status(200).json({ post });
};

export const getAllPosts: RequestHandler = async (req, res) => {
  try {
    const posts = await Post.find({ deleted: false });
    return res.status(200).json({ posts });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getUserPosts: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });
    const userPosts = await Post.find({ user: user._id, deleted: false });
    if (!userPosts) return res.status(404).json({ msg: "No posts found!" });
    return res.status(200).json({ userPosts });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};
