"use strict";
//Implements user api endpoints
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
var userController = __importStar(require("../controllers/userController"));
var router = express_1.Router();
//public
router.route("/register").post(userController.registerUser);
router.route("/login").post(userController.loginUser);
router.route("/recover").post(userController.sendPasswordResetEmail);
router.route("/reset/:resetToken").post(userController.resetPassword);
router.route("/confirm/:userId").get(userController.confirmAccountEmail);
router.route("/user").post(userController.getUserByUsername);
//private
router.use(security.authenticateUser, security.authenticateToken);
router.route("/current").get(userController.getCurrentUser);
router.route("/logout").get(userController.logoutUser);
router.route("/confirm").get(userController.resendConfirmationEmail);
router.route("/delete").delete(userController.deactivateAccount);
router.route("/edit").patch(userController.updateUser);
router.route("/auth").get(userController.auth);
exports.default = router;
