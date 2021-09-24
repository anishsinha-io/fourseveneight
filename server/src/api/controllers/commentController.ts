//Implements controllers for comment api endpoints

import { RequestHandler } from "express";
import { ObjectId } from "mongoose";

import Comment, { IComment } from "../../models/commentModel";
import Post from "../../models/postModel";
import { IUser } from "../../models/userModel";

export const addRootComment: RequestHandler = async (req, res) => {
  try {
    const user = req.user as IUser;
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ msg: "Post not found" });
    const { content } = req.body;
    const commentFields = {
      user: user.id,
      post: post.id,
      content,
      directChildComments: [] as ObjectId[],
    } as IComment;
    const newComment = new Comment(commentFields);
    await newComment.save();
    const rootCommentId = newComment.id;
    await Post.findOneAndUpdate(
      { slug: req.params.slug },
      { $push: { rootComments: rootCommentId } }
    );
    return res.status(201).json({ newComment });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const addChildComment: RequestHandler = async (req, res) => {
  try {
    const user = req.user as IUser;
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ msg: "Comment not found" });
    const { content } = req.body;
    const commentFields = {
      user: user.id,
      comment: comment.id,
      content,
      directChildComments: [] as ObjectId[],
    } as IComment;

    const newComment = new Comment(commentFields);
    await newComment.save();
    const childCommentId = newComment.id;
    await Comment.findByIdAndUpdate(comment.id, {
      $push: { directChildComments: childCommentId },
    });
    return res.status(201).json({ newComment });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const updateComment: RequestHandler = async (req, res) => {
  try {
    const user: IUser = req.user as IUser;
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ msg: "Comment not found" });
    if (user.id.toString() !== comment.user.toString())
      return res
        .status(403)
        .json({ msg: "Current account not authorized for this action" });

    const { content } = req.body;
    await Comment.findByIdAndUpdate(
      comment.id,
      { content: content },
      { new: true }
    );
    return res.status(200).json({ msg: "Comment successfully updated!" });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

//todo refactor
export const deleteRootComment: RequestHandler = async (req, res) => {
  try {
    const user = req.user as IUser;
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ msg: "Comment not found" });
    if (user.id.toString() !== comment.user.toString())
      return res
        .status(403)
        .json({ msg: "Current account not authorized for this action" });
    await Post.findByIdAndUpdate(comment.post, {
      $pull: { rootComments: comment.id },
    });
    return res.status(204).json({ msg: "Comment successfully deleted!" });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error!" });
  }
};

export const deleteChildComment: RequestHandler = async (req, res) => {
  try {
    const user = req.user as IUser;
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ msg: "Comment not found" });
    if (user.id.toString() !== comment.user.toString())
      return res
        .status(403)
        .json({ msg: "Current account not authorized for this action" });
    await Comment.findByIdAndUpdate(comment.comment, {
      $pull: { directChildComments: comment.id },
    });
    return res.status(204).json({ msg: "Comment successfully deleted!" });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};