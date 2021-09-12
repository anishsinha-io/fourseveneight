"use strict";
//Implements database schema for comments
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var commentSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    post: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Post",
    },
    comment: {
        type: mongoose_1.Schema.Types.ObjectId,
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
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
    deleted: {
        type: Boolean,
        default: false,
    },
});
var Comment = mongoose_1.model("Comment", commentSchema);
exports.default = Comment;
