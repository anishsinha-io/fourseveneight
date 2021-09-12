"use strict";
//Implements profile api endpoints
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var security = __importStar(require("../../auth/security"));
var profileController = __importStar(require("../controllers/profileController"));
var router = express_1.Router();
//All routes are private
router.use(security.authenticateUser, security.authenticateToken);
router
    .route("/")
    .get(profileController.getUserProfile)
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
exports.default = router;
