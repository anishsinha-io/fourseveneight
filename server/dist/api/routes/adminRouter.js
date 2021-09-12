"use strict";
//Implements admin api endpoints
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
var adminController = __importStar(require("../controllers/adminController"));
var router = express_1.Router();
//All routes are private and restricted
router.use(security.authenticateUser, security.authenticateToken, security.isActive, security.restrictTo("root"));
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
exports.default = router;
