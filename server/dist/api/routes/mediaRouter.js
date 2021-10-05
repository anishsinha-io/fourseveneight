"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var media_1 = require("../../middleware/media");
var router = express_1.Router();
router.route("/image/:key").get(media_1.downloadImage);
router.route("/upload").post(media_1.upload.single("image"), function (req, res, next) {
    console.log("here");
    next();
}, media_1.uploadImage, function (req, res, next) {
    return res.status(200).json(req.imageLink);
});
router.route("/file/:key").get(media_1.downloadImage);
exports.default = router;
