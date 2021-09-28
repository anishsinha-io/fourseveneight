//Implements profile api endpoints

import { Router } from "express";

import * as security from "../../auth/security";
import * as profileController from "../controllers/profileController";

const router = Router();

router.route("/").get(profileController.getUserProfile);
router.route("/:username").get(profileController.getProfileFromQuery);

router.use(security.authenticateUser, security.authenticateToken);

router
  .route("/")
  .post(profileController.createProfile)
  .delete(profileController.clearUserProfile);
router.route("/experience").put(profileController.addProfileExperience);
router.route("/education").put(profileController.addProfileEducation);
router
  .route("/remove/experience/:experienceSlug")
  .patch(profileController.removeProfileExperience);
router
  .route("/remove/education/:educationSlug")
  .patch(profileController.removeProfileEducation);

// router.route("/:userId").get(profileController.getUserProfile);
// router.route("/clear/:userId").delete(profileController.clearUserProfile);

export default router;
