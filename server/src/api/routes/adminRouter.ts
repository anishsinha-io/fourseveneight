//Implements admin api endpoints

import { Router } from "express";

import * as security from "../../auth/security";
import * as adminController from "../controllers/adminController";

const router: Router = Router();

//All routes are private and restricted

router.use(
  security.authenticateUser,
  security.authenticateToken,
  security.isActive,
  security.restrictTo("root")
);

//Users
router.route("/users").get(adminController._getAllUsers);
router.route("/users/:username").get(adminController._getUser);
router.route("/users/delete/:username").delete(adminController._deactivateUser);

//Posts

router
  .route("/posts/:username")
  .delete(adminController._deactivateAllUserPosts);

//Comments

router.route("/comments").get(adminController._getAllComments);
router
  .route("/comments/:username")
  .get(adminController._getAllUserComments)
  .delete(adminController._deactivateAllUserComments);

export default router;
