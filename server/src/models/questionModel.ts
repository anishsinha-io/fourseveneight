import { Schema, model, Document } from "mongoose";

import User from "./userModel";

export interface IQuestion extends Document {
  user: Schema.Types.ObjectId;
  content: string;
  category: string;
  tags: string[];
  date: Date;
  deleted: boolean;
}

const questionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
  },
  category: { type: String },
  tags: [{ type: String }],
  date: { type: Date, default: Date.now() },
  deleted: { type: Boolean, default: false },
});

questionSchema.pre(/^find/, function (next) {
  try {
    this.populate({
      path: "user",
      select: "_id username",
      match: { active: true },
    });
    next();
  } catch (err) {}
});

const Question = model<IQuestion>("Question", questionSchema);

export default Question;
