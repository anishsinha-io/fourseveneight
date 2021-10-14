import { Schema, model, Document } from "mongoose";

import User from "./userModel";

export interface IQuestion extends Document {
  title: string;
  user: Schema.Types.ObjectId;
  author: string;
  content: string;
  category: string;
  tags: string[];
  date: Date;
  deleted: boolean;
  embeddedMediaFiles: string[];
}

const questionSchema = new Schema({
  title: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  author: { type: String },
  content: {
    type: String,
    required: true,
  },
  category: { type: String },
  tags: [{ type: String }],
  date: { type: Date, default: Date.now() },
  deleted: { type: Boolean, default: false },
  embeddedMediaFiles: [{ type: String }],
});

questionSchema.pre("save", async function (next) {
  const author = await User.findById(this.user);
  if (author) this.author = `${author.firstName} ${author.lastName}`;
  next();
});

const Question = model<IQuestion>("Question", questionSchema);

export default Question;
