import { Router } from "express";
import * as tagsController from "../controllers/tagsController";

const router = Router();

router.route("/").get(tagsController.getTags);

export default router;
