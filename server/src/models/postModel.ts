//Implements database schema for posts

import slugify from "slugify";
import { Schema, model, Document, ObjectId } from "mongoose";

export interface IPost extends Document {
  user: ObjectId;
  title: string;
  content: string;
  author: string;
  likes?: ObjectId[];
  rootComments?: ObjectId[];
  slug: string;
  deleted: boolean;
  date: Date;
}

const postSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  rootComments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  slug: {
    type: String,
    unique: true,
  },
});

postSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Post = model<IPost>("Post", postSchema);

export default Post;
