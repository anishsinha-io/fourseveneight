"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserQuestions = exports.getAllQuestions = exports.getQuestion = exports.editQuestion = exports.removeQuestion = exports.createQuestion = void 0;
var questionModel_1 = __importDefault(require("../../models/questionModel"));
var userModel_1 = __importDefault(require("../../models/userModel"));
var createQuestion = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a, content, category, tags, newQuestionFields, newQuestion, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                user = req.user;
                _a = req.body, content = _a.content, category = _a.category, tags = _a.tags;
                newQuestionFields = {
                    user: user.id,
                    content: content,
                    category: category,
                    tags: tags,
                };
                newQuestion = new questionModel_1.default(newQuestionFields);
                return [4 /*yield*/, newQuestion.save()];
            case 1:
                _b.sent();
                return [2 /*return*/, res.status(200).json({ newQuestion: newQuestion })];
            case 2:
                err_1 = _b.sent();
                return [2 /*return*/, res.status(500).json({ msg: "Internal server error" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createQuestion = createQuestion;
var removeQuestion = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, questionId, question, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                user = req.user;
                questionId = req.params.questionId;
                return [4 /*yield*/, questionModel_1.default.findById(questionId)];
            case 1:
                question = _a.sent();
                if (!question)
                    return [2 /*return*/, res.status(404).json({ msg: "Question not found!" })];
                if (question.user.toString() !== user.id.toString())
                    return [2 /*return*/, res.status(403).json({ msg: "Unable to authorize!" })];
                return [4 /*yield*/, questionModel_1.default.findByIdAndUpdate(questionId, { deleted: true })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(204).json({ msg: "Question successfully deleted!" })];
            case 3:
                err_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({ msg: "Internal server error!" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.removeQuestion = removeQuestion;
var editQuestion = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, questionId, _a, content, category, tags, question, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                user = req.user;
                questionId = req.params.questionId;
                _a = req.body, content = _a.content, category = _a.category, tags = _a.tags;
                return [4 /*yield*/, questionModel_1.default.findById(questionId)];
            case 1:
                question = _b.sent();
                if (!question)
                    return [2 /*return*/, res.status(404).json({ msg: "Question not found" })];
                if (question.user.toString() !== user.id.toString())
                    return [2 /*return*/, res.status(403).json({ msg: "Unable to authorize!" })];
                console.log(questionId);
                return [4 /*yield*/, questionModel_1.default.findByIdAndUpdate(questionId, { content: content, category: category, tags: tags })];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(200).json({ msg: "Question successfully updated" })];
            case 3:
                err_3 = _b.sent();
                return [2 /*return*/, res.status(500).json({ msg: "Internal server error!" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.editQuestion = editQuestion;
var getQuestion = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var questionId, question, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                questionId = req.params.id;
                return [4 /*yield*/, questionModel_1.default.findById(questionId)];
            case 1:
                question = _a.sent();
                if (!question)
                    return [2 /*return*/, res.status(404).json({ msg: "Question not found!" })];
                return [2 /*return*/, res.status(200).json({ question: question })];
            case 2:
                err_4 = _a.sent();
                return [2 /*return*/, res.status(500).json({ msg: "Internal server error" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getQuestion = getQuestion;
var getAllQuestions = function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var questions, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, questionModel_1.default.find()];
            case 1:
                questions = _a.sent();
                if (!questions)
                    return [2 /*return*/, res.status(404).json({ msg: "No questions found!" })];
                return [2 /*return*/, res.status(200).json({ questions: questions })];
            case 2:
                err_5 = _a.sent();
                return [2 /*return*/, res.status(500).json({ msg: "Internal server error" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllQuestions = getAllQuestions;
var getUserQuestions = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, userQuestions, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                userId = req.params.userId;
                return [4 /*yield*/, userModel_1.default.findById(userId)];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(404).json({ msg: "User not found" })];
                return [4 /*yield*/, questionModel_1.default.find({ user: user._id }, { deleted: false })];
            case 2:
                userQuestions = _a.sent();
                return [2 /*return*/, res.status(200).json({ userQuestions: userQuestions })];
            case 3:
                err_6 = _a.sent();
                return [2 /*return*/, res.status(500).json({ msg: "Internal server error" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUserQuestions = getUserQuestions;
