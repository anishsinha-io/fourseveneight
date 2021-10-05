import { Router } from "express";

import { uploadImage, downloadImage, upload } from "../../middleware/media";

const router = Router();

router.route("/image/:key").get(downloadImage);

router.route("/upload").post(
  upload.single("image"),
  (req, res, next) => {
    console.log("here");
    next();
  },
  uploadImage,
  (req, res, next) => {
    return res.status(200).json(req.imageLink);
  }
);

router.route("/file/:key").get(downloadImage);

export default router;
