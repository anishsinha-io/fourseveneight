//Implements comment api endpoints

import { Router } from "express";

import * as commentController from "../controllers/commentController";
import * as security from "../../auth/security";

const router: Router = Router();

//public

router.route("/:commentId").get(commentController.getComment);

//private
router.use(security.authenticateUser, security.authenticateToken);

router.route("/:slug").post(commentController.addRootComment);
router.route("/child/:commentId").post(commentController.addChildComment);
router.route("/update/:commentId").patch(commentController.updateComment);
router
  .route("/delete/root/:commentId")
  .delete(commentController.deleteRootComment);
router
  .route("/delete/child/:commentId")
  .delete(commentController.deleteChildComment);

export default router;
