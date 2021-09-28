"use strict";
//Implements controllers for profile api endpoints
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileFromQuery = exports.clearUserProfile = exports.getUserProfile = exports.createProfile = exports.addProfileEducation = exports.addProfileExperience = exports.removeProfileEducation = exports.removeProfileExperience = void 0;
var factory = __importStar(require("./handlerFactory"));
var security = __importStar(require("../../auth/security"));
var profileModel_1 = __importDefault(require("../../models/profileModel"));
exports.removeProfileExperience = factory.removeGenericProfileField({}, "experience");
exports.removeProfileEducation = factory.removeGenericProfileField({}, "education");
exports.addProfileExperience = factory.addGenericProfileField({}, "company", "experience", "company", "experience", "title", "company", "location", "from", "to", "current", "description");
exports.addProfileEducation = factory.addGenericProfileField({}, "school", "education", "school", "degree", "fieldOfStudy", "from", "to", "current", "description");
var createProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, profileObject, profileFields, profile, newProfile, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                profileObject = security.sanitizeBody(req.body, "company", "website", "location", "bio", "status", "githubUsername", "skills", "youtube", "facebook", "twitter", "instagram", "linkedin", "tiktok");
                profileFields = {};
                profileFields.social = {};
                profileFields.user = user.id;
                if (profileObject.company)
                    profileFields.company = profileObject.company;
                if (profileObject.website)
                    profileFields.website = profileObject.website;
                if (profileObject.location)
                    profileFields.location = profileObject.location;
                if (profileObject.bio)
                    profileFields.bio = profileObject.bio;
                if (profileObject.status)
                    profileFields.status = profileObject.status;
                if (profileObject.githubUsername)
                    profileFields.githubUsername = profileObject.githubUsername;
                if (profileObject.skills)
                    profileFields.skills = profileObject.skills
                        .split(",")
                        .map(function (skill) { return skill.trim(); });
                if (profileObject.twitter)
                    profileFields.social.twitter = profileObject.twitter;
                if (profileObject.youtube)
                    profileFields.social.youtube = profileObject.youtube;
                if (profileObject.facebook)
                    profileFields.social.facebook = profileObject.facebook;
                if (profileObject.instagram)
                    profileFields.social.instagram = profileObject.instagram;
                if (profileObject.linkedin)
                    profileFields.social.linkedin = profileObject.linkedin;
                if (profileObject.tiktok)
                    profileFields.social.tiktok = profileObject.tiktok;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, profileModel_1.default.findOne({ user: user.id })];
            case 2:
                profile = _a.sent();
                if (!profile) return [3 /*break*/, 4];
                return [4 /*yield*/, profileModel_1.default.findOneAndUpdate({ user: user.id }, { $set: profileFields }, { new: true })];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ msg: "Profile updated successfully" })];
            case 4:
                newProfile = new profileModel_1.default(profileFields);
                console.log(newProfile);
                return [4 /*yield*/, newProfile.save()];
            case 5:
                _a.sent();
                return [2 /*return*/, res.status(201).json({ msg: "Profile created successfully!" })];
            case 6:
                err_1 = _a.sent();
                console.log(err_1);
                return [2 /*return*/, res.status(500).json({ msg: "Internal server error" })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.createProfile = createProfile;
//Returns empty profile if user has not created one
var getUserProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, profile, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, profileModel_1.default.findOne({ user: user.id })];
            case 2:
                profile = _a.sent();
                if (profile)
                    return [2 /*return*/, res.status(200).json({ profile: profile })];
                return [2 /*return*/, res.status(404).json({ msg: "Profile not found!" })];
            case 3:
                err_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({ msg: "Internal server error" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUserProfile = getUserProfile;
//todo refactor+rewrite
var clearUserProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, profile, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, profileModel_1.default.findOne({ user: user.id })];
            case 2:
                profile = _a.sent();
                if (!profile) return [3 /*break*/, 4];
                return [4 /*yield*/, profileModel_1.default.findOneAndUpdate({ user: user.id }, {
                        $set: {
                            experience: [],
                            education: [],
                            skills: [],
                            company: "",
                            githubUsername: "",
                            website: "",
                            location: "",
                            status: "",
                            bio: "",
                            social: {},
                        },
                    }, { new: true })];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ profile: profile })];
            case 4: return [2 /*return*/, res.status(404).json({ msg: "Profile not found" })];
            case 5:
                err_3 = _a.sent();
                return [2 /*return*/, res.status(500).json({ msg: "Internal server error" })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.clearUserProfile = clearUserProfile;
var getProfileFromQuery = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var queriedUser, profile, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                queriedUser = req.params.username;
                return [4 /*yield*/, profileModel_1.default.findOne({ username: queriedUser })];
            case 1:
                profile = _a.sent();
                return [2 /*return*/, res.status(200).json({ profile: profile })];
            case 2:
                err_4 = _a.sent();
                return [2 /*return*/, res.status(500).json({ msg: "Internal server error" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getProfileFromQuery = getProfileFromQuery;
