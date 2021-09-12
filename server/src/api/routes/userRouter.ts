//Implements user api endpoints

import { Router } from "express";
import * as security from "../../auth/security";

import * as userController from "../controllers/userController";

const router = Router();

//public

router.route("/register").post(userController.registerUser);
router.route("/login").post(userController.loginUser);
router.route("/recover").post(userController.sendPasswordResetEmail);
router.route("/reset/:resetToken").post(userController.resetPassword);
router.route("/confirm/:userId").get(userController.confirmAccountEmail);

//private

router.use(security.authenticateUser, security.authenticateToken);

router.route("/current").get(userController.getCurrentUser);
router.route("/logout").get(userController.logoutUser);
router.route("/confirm").get(userController.resendConfirmationEmail);
router.route("/delete").delete(userController.deactivateAccount);
router.route("/edit").patch(userController.updateUser);
router.route("/auth").get(userController.auth);

export default router;
