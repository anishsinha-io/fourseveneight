"use strict";
//Implements controllers for comment api endpoints
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
exports.getComment = exports.deleteChildComment = exports.deleteRootComment = exports.updateComment = exports.addChildComment = exports.addRootComment = void 0;
var commentModel_1 = __importDefault(require("../../models/commentModel"));
var postModel_1 = __importDefault(require("../../models/postModel"));
var addRootComment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, post, content, commentFields, newComment, rootCommentId, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                user = req.user;
                return [4 /*yield*/, postModel_1.default.findOne({ slug: req.params.slug })];
            case 1:
                post = _a.sent();
                if (!post)
                    return [2 /*return*/, res.status(404).json({ msg: "Post not found" })];
                content = req.body.content;
                commentFields = {
                    user: user.id,
                    post: post.id,
                    content: content,
                    directChildComments: [],
                };
                newComment = new commentModel_1.default(commentFields);
                return [4 /*yield*/, newComment.save()];
            case 2:
                _a.sent();
                rootCommentId = newComment.id;
                return [4 /*yield*/, postModel_1.default.findOneAndUpdate({ slug: req.params.slug }, { $push: { rootComments: rootCommentId } })];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(201).json({ newComment: newComment })];
            case 4:
                err_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({ msg: "Internal server error" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.addRootComment = addRootComment;
var addChildComment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, comment, content, commentFields, newComment, childCommentId, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                user = req.user;
                return [4 /*yield*/, commentModel_1.default.findById(req.params.commentId)];
            case 1:
                comment = _a.sent();
                if (!comment)
                    return [2 /*return*/, res.status(404).json({ msg: "Comment not found" })];
                content = req.body.content;
                commentFields = {
                    user: user.id,
                    comment: comment.id,
                    content: content,
                    directChildComments: [],
                };
                newComment = new commentModel_1.default(commentFields);
                return [4 /*yield*/, newComment.save()];
            case 2:
                _a.sent();
                childCommentId = newComment.id;
                return [4 /*yield*/, commentModel_1.default.findByIdAndUpdate(comment.id, {
                        $push: { directChildComments: childCommentId },
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(201).json({ newComment: newComment })];
            case 4:
                err_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({ msg: "Internal server error" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.addChildComment = addChildComment;
var updateComment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, comment, content, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                user = req.user;
                return [4 /*yield*/, commentModel_1.default.findById(req.params.commentId)];
            case 1:
                comment = _a.sent();
                if (!comment)
                    return [2 /*return*/, res.status(404).json({ msg: "Comment not found" })];
                if (user.id.toString() !== comment.user.toString())
                    return [2 /*return*/, res
                            .status(403)
                            .json({ msg: "Current account not authorized for this action" })];
                content = req.body.content;
                return [4 /*yield*/, commentModel_1.default.findByIdAndUpdate(comment.id, { content: content }, { new: true })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ msg: "Comment successfully updated!" })];
            case 3:
                err_3 = _a.sent();
                return [2 /*return*/, res.status(500).json({ msg: "Internal server error" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateComment = updateComment;
//todo refactor
var deleteRootComment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, comment, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                user = req.user;
                return [4 /*yield*/, commentModel_1.default.findById(req.params.commentId)];
            case 1:
                comment = _a.sent();
                if (!comment)
                    return [2 /*return*/, res.status(404).json({ msg: "Comment not found" })];
                if (user.id.toString() !== comment.user.toString())
                    return [2 /*return*/, res
                            .status(403)
                            .json({ msg: "Current account not authorized for this action" })];
                return [4 /*yield*/, postModel_1.default.findByIdAndUpdate(comment.post, {
                        $pull: { rootComments: comment.id },
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(204).json({ msg: "Comment successfully deleted!" })];
            case 3:
                err_4 = _a.sent();
                return [2 /*return*/, res.status(500).json({ msg: "Internal server error!" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteRootComment = deleteRootComment;
var deleteChildComment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, comment, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                user = req.user;
                return [4 /*yield*/, commentModel_1.default.findById(req.params.commentId)];
            case 1:
                comment = _a.sent();
                if (!comment)
                    return [2 /*return*/, res.status(404).json({ msg: "Comment not found" })];
                if (user.id.toString() !== comment.user.toString())
                    return [2 /*return*/, res
                            .status(403)
                            .json({ msg: "Current account not authorized for this action" })];
                return [4 /*yield*/, commentModel_1.default.findByIdAndUpdate(comment.comment, {
                        $pull: { directChildComments: comment.id },
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(204).json({ msg: "Comment successfully deleted!" })];
            case 3:
                err_5 = _a.sent();
                return [2 /*return*/, res.status(500).json({ msg: "Internal server error" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteChildComment = deleteChildComment;
var getComment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var comment, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, commentModel_1.default.findById(req.params.commentId)];
            case 1:
                comment = _a.sent();
                if (!comment)
                    return [2 /*return*/, res.status(404).json({ msg: "Comment not found" })];
                return [2 /*return*/, res.status(200).json({ comment: comment })];
            case 2:
                err_6 = _a.sent();
                return [2 /*return*/, res.status(500).json({ msg: "Internal server error" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getComment = getComment;
