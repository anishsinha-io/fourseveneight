"use strict";
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
var questionController = __importStar(require("../controllers/questionController"));
var router = express_1.Router();
router.route("/").get(questionController.getAllQuestions);
router.route("/:questionId").get(questionController.getQuestion);
router.use(security.authenticateUser, security.authenticateToken);
router.route("/create").post(questionController.createQuestion);
router.route("/remove/:questionId").patch(questionController.removeQuestion);
router.route("/edit/:questionId").post(questionController.editQuestion);
exports.default = router;
