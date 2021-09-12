"use strict";
//Implements database schema for profiles
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var profileSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    photo: {
        type: String,
        default: "default.jpg",
    },
    company: {
        type: String,
    },
    website: {
        type: String,
    },
    location: {
        type: String,
    },
    status: {
        type: String,
    },
    skills: {
        type: [String],
    },
    bio: {
        type: String,
    },
    githubUsername: {
        type: String,
    },
    experience: {
        type: [
            {
                title: {
                    type: String,
                    required: true,
                },
                company: {
                    type: String,
                    required: true,
                },
                location: {
                    type: String,
                },
                from: {
                    type: Date,
                },
                to: {
                    type: Date,
                },
                current: {
                    type: Boolean,
                    default: false,
                },
                description: {
                    type: String,
                },
                slug: {
                    type: String,
                },
            },
        ],
        required: false,
    },
    education: {
        type: [
            {
                school: {
                    type: String,
                    required: true,
                },
                degree: {
                    type: String,
                    required: true,
                },
                fieldOfStudy: {
                    type: String,
                    required: true,
                },
                from: {
                    type: Date,
                    required: true,
                },
                to: {
                    type: Date,
                },
                current: {
                    type: Boolean,
                    default: false,
                },
                description: {
                    type: String,
                },
                slug: {
                    type: String,
                    unique: true,
                },
                required: false,
            },
        ],
        required: false,
    },
    social: {
        youtube: {
            type: String,
        },
        twitter: {
            type: String,
        },
        facebook: {
            type: String,
        },
        linkedin: {
            type: String,
        },
        instagram: {
            type: String,
        },
        tiktok: {
            type: String,
        },
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
var Profile = mongoose_1.model("Profile", profileSchema);
exports.default = Profile;
