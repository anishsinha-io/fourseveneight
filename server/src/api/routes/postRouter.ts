//Implements post api endpoints

import { Router } from "express";

import * as security from "../../auth/security";
import * as postController from "../controllers/postController";

const router: Router = Router();

//public

router.route("/").get(postController.getAllPosts);
router.route("/:slug").get(postController.getPost);

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
