"use strict";
//Implements database schema for users
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
//User schema
var userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        select: false,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    active: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: {
        type: String,
        default: undefined,
    },
    resetPasswordSentAt: {
        type: Number,
        default: undefined,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ["user", "admin", "root"],
        default: "user",
    },
});
var User = mongoose_1.model("User", userSchema);
exports.default = User;
