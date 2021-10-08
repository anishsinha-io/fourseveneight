"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var questionReplySchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    question: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    deleted: {
        type: Boolean,
        default: false,
    },
});
var QuestionReply = mongoose_1.model("QuestionReply", questionReplySchema);
exports.default = QuestionReply;
