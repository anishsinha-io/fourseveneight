"use strict";
//Implements database schema for posts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var slugify_1 = __importDefault(require("slugify"));
var mongoose_1 = require("mongoose");
var postSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    image: {
        type: String,
    },
    imageAlt: {
        type: String,
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
    summary: {
        type: String,
    },
    author: {
        type: String,
        required: true,
    },
    likes: [
        {
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "User",
            },
        },
    ],
    rootComments: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
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
    this.slug = slugify_1.default(this.title, { lower: true });
    next();
});
postSchema.pre("/^find/", function (next) {
    this.populate({
        path: "rootComments",
        select: "-deleted",
        match: { deleted: false },
    });
});
var Post = mongoose_1.model("Post", postSchema);
exports.default = Post;
