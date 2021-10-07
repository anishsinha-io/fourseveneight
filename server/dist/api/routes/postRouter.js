"use strict";
//Implements post api endpoints
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
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var security = __importStar(require("../../auth/security"));
var postController = __importStar(require("../controllers/postController"));
var media_1 = require("../../middleware/media");
var router = express_1.Router();
//public
router.route("/").get(postController.getAllPosts);
router.route("/:slug").get(postController.getPost);
router.route("/uploads/image").post(media_1.upload.single("image"), media_1.uploadImage);
router.route("/user/:userId").get(postController.getUserPosts);
//private
router.use(security.authenticateUser, security.authenticateToken, security.isActive);
router
    .route("/")
    .post(media_1.upload.single("image"), media_1.uploadImage, postController.createPost);
router
    .route("/update/:slug")
    .patch(media_1.upload.single("image"), media_1.uploadImage, postController.updatePost);
router.route("/delete/:slug").delete(postController.deletePost);
exports.default = router;
