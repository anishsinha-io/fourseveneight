"use strict";
//Implements controllers for post api endpoints
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
exports.getAllPosts = exports.getPost = exports.updatePost = exports.deletePost = exports.createPost = void 0;
var slugify_1 = __importDefault(require("slugify"));
var postModel_1 = __importDefault(require("../../models/postModel"));
var createPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a, content, title, summary, imageAlt, tags, category, embeddedMediaFiles, file, parsedTags, parsedMediaFiles, postFields, newPost, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                user = req.user;
                if (!user.active)
                    return [2 /*return*/, res.status(403).json({
                            msg: "You must activate your account to access this resource!",
                        })];
                _a = req.body, content = _a.content, title = _a.title, summary = _a.summary, imageAlt = _a.imageAlt, tags = _a.tags, category = _a.category, embeddedMediaFiles = _a.embeddedMediaFiles;
                file = req.file;
                console.log("embeddedMediaFiles", embeddedMediaFiles);
                parsedTags = JSON.parse(tags);
                parsedMediaFiles = JSON.parse(embeddedMediaFiles);
                postFields = {
                    user: user.id,
                    image: "image-fse-" + (file === null || file === void 0 ? void 0 : file.filename),
                    imageAlt: imageAlt,
                    summary: summary,
                    title: title,
                    content: content,
                    rootComments: [],
                    likes: [],
                    tags: parsedTags,
                    category: category,
                    embeddedMediaFiles: parsedMediaFiles,
                };
                newPost = new postModel_1.default(postFields);
                return [4 /*yield*/, newPost.save()];
            case 1:
                _b.sent();
                return [2 /*return*/, res.status(201).json({ newPost: newPost })];
            case 2:
                err_1 = _b.sent();
                return [2 /*return*/, res.status(500).json({ msg: "Internal server error" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createPost = createPost;
//todo refactor
var deletePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, post, updateObject, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                user = req.user;
                return [4 /*yield*/, postModel_1.default.findOne({ slug: req.params.slug })];
            case 1:
                post = _a.sent();
                if (!post)
                    return [2 /*return*/, res.status(404).json({ msg: "Post not found" })];
                if (user.id.toString() !== post.user.toString())
                    return [2 /*return*/, res
                            .status(403)
                            .json({ msg: "Current account not authorized for this action" })];
                updateObject = { deleted: true };
                return [4 /*yield*/, postModel_1.default.findOneAndUpdate({ slug: req.params.slug }, updateObject)];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(204).json({ msg: "Post successfully deleted!" })];
            case 3:
                err_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({ msg: "Internal server error" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deletePost = deletePost;
var updatePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, post, _a, title, content, summary, imageAlt, tags, category, parsedTags, slug, file, image, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                user = req.user;
                return [4 /*yield*/, postModel_1.default.findOne({ slug: req.params.slug })];
            case 1:
                post = _b.sent();
                if (!post)
                    return [2 /*return*/, res.status(404).json({ msg: "Post not found" })];
                if (user.id.toString() !== post.user.toString())
                    return [2 /*return*/, res
                            .status(403)
                            .json({ msg: "Current account not authorized for this action" })];
                _a = req.body, title = _a.title, content = _a.content, summary = _a.summary, imageAlt = _a.imageAlt, tags = _a.tags, category = _a.category;
                parsedTags = JSON.parse(tags);
                slug = slugify_1.default(title, { lower: true });
                file = req.file;
                image = void 0;
                if (file) {
                    image = "image-fse-" + (file === null || file === void 0 ? void 0 : file.filename);
                }
                return [4 /*yield*/, postModel_1.default.findOneAndUpdate({ slug: req.params.slug }, {
                        title: title,
                        content: content,
                        summary: summary,
                        slug: slug,
                        image: image,
                        imageAlt: imageAlt,
                        tags: parsedTags,
                        category: category,
                    }, {
                        new: true,
                        runValidators: true,
                    })];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(200).json({ msg: "Post successfully updated!" })];
            case 3:
                err_3 = _b.sent();
                return [2 /*return*/, res.status(500).json({ msg: "Internal server error" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updatePost = updatePost;
var getPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, postModel_1.default.findOne({ slug: req.params.slug })];
            case 1:
                post = _a.sent();
                if (!post || post.deleted === true)
                    return [2 /*return*/, res.status(404).json({ msg: "Post not found" })];
                return [2 /*return*/, res.status(200).json({ post: post })];
        }
    });
}); };
exports.getPost = getPost;
var getAllPosts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var posts, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, postModel_1.default.find({ deleted: false })];
            case 1:
                posts = _a.sent();
                return [2 /*return*/, res.status(200).json({ posts: posts })];
            case 2:
                err_4 = _a.sent();
                return [2 /*return*/, res.status(500).json({ msg: "Internal server error" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllPosts = getAllPosts;
