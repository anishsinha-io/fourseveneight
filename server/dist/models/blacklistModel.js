"use strict";
//Implements database schema for token blacklist
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var blacklistTokenSchema = new mongoose_1.Schema({
    token: {
        type: String,
    },
    createdAt: {
        type: Number,
        default: Date.now(),
    },
});
blacklistTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });
var Blacklist = mongoose_1.model("BlacklistToken", blacklistTokenSchema);
exports.default = Blacklist;
