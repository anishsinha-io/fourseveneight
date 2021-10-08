import { Router } from "express";

import * as security from "../../auth/security";
import * as questionController from "../controllers/questionController";

const router = Router();

router.route("/").get(questionController.getAllQuestions);
router.route("/:questionId").get(questionController.getQuestion);

router.use(security.authenticateUser, security.authenticateToken);

router.route("/create").post(questionController.createQuestion);
router.route("/remove/:questionId").patch(questionController.removeQuestion);
router.route("/edit/:questionId").post(questionController.editQuestion);

export default router;
