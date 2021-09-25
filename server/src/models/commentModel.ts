//Implements database schema for comments

import { Schema, model, Document } from "mongoose";
import User from "./userModel";

export interface ILike {
  user: Schema.Types.ObjectId;
}

//not entirely sure about the efficiency of this model
export interface IComment extends Document {
  user: Schema.Types.ObjectId;
  author?: string;
  post?: Schema.Types.ObjectId;
  comment?: Schema.Types.ObjectId;
  content: string;
  date: Date;
  directChildComments: Schema.Types.ObjectId[];
  deleted: boolean;
}

const commentSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  author: {
    type: String,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  directChildComments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  deleted: {
    type: Boolean,
    default: false,
  },
});

commentSchema.pre("save", async function (next) {
  const author = await User.findById(this.user);
  if (author) this.author = `${author.firstName} ${author.lastName}`;
  next();
});

const Comment = model<IComment>("Comment", commentSchema);

export default Comment;
