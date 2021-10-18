import { Router } from "express";

import { getJwt, getApiKey } from "../controllers/tmceController";
import * as security from "../../auth/security";

const router = Router();

router.use(security.authenticateUser, security.authenticateToken);

router.route("/jwt").post(getJwt);
router.route("/apikey").get(getApiKey);

export default router;
