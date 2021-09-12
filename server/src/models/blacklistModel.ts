//Implements database schema for token blacklist

import { Schema, model, Document } from "mongoose";

export interface IBlacklistToken extends Document {
  token: string;
  createdAt: number;
}

const blacklistTokenSchema = new Schema({
  token: {
    type: String,
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
});

blacklistTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

const Blacklist = model<IBlacklistToken>(
  "BlacklistToken",
  blacklistTokenSchema
);

export default Blacklist;
