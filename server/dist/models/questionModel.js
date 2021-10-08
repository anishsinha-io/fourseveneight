"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var questionSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
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
var Question = mongoose_1.model("Question", questionSchema);
exports.default = Question;
