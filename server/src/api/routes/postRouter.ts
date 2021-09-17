//Implements post api endpoints

import { Router } from "express";

import * as security from "../../auth/security";
import * as postController from "../controllers/postController";
import { uploadImage, downloadImage, upload } from "../../middleware/media";

const router: Router = Router();

//public

router.route("/").get(postController.getAllPosts);
router.route("/:slug").get(postController.getPost);
router.route("/uploads/image").post(upload.single("image"), uploadImage);
router.route("/downloads/image/:key").get(downloadImage);

//private

router.use(
  security.authenticateUser,
  security.authenticateToken,
  security.isActive
);

router.route("/").post(postController.createPost);
router.route("/update/:slug").patch(postController.updatePost);
router.route("/delete/:slug").delete(postController.deletePost);

export default router;
