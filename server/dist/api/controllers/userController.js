"use strict";
//Implements controllers for user api endpoints
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
exports.auth = exports.updateUser = exports.deactivateAccount = exports.resendConfirmationEmail = exports.confirmAccountEmail = exports.logoutUser = exports.resetPassword = exports.sendPasswordResetEmail = exports.getCurrentUser = exports.loginUser = exports.registerUser = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var userModel_1 = __importDefault(require("../../models/userModel"));
var blacklistModel_1 = __importDefault(require("../../models/blacklistModel"));
var security = __importStar(require("../../auth/security"));
var Email_1 = __importDefault(require("../../util/Email"));
var registerUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstName, lastName, email, username, password, user, hash, confirmationUrl, confirmationToken, payload, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, username = _a.username, password = _a.password;
                return [4 /*yield*/, userModel_1.default.findOne({ username: username })];
            case 1:
                user = _b.sent();
                if (user) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ errors: [{ msg: "User with that username already exists!" }] })];
                }
                user = new userModel_1.default({
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    email: email,
                    password: password,
                });
                return [4 /*yield*/, security.hashPassword(12, password)];
            case 2:
                hash = _b.sent();
                if (hash)
                    user.password = hash;
                else
                    return [2 /*return*/, res
                            .status(500)
                            .json({ msg: "Unable to create your account at this time!" })];
                return [4 /*yield*/, user.save()];
            case 3:
                _b.sent();
                confirmationUrl = req.protocol + "://" + req.get("host") + "/api/confirm/";
                confirmationToken = user.id;
                payload = {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                };
                jsonwebtoken_1.default.sign(payload, "" + process.env.JWT_SECRET, { expiresIn: 3600 }, function (err, token) {
                    return res.status(201).json({ data: "Bearer " + token });
                });
                return [3 /*break*/, 5];
            case 4:
                err_1 = _b.sent();
                return [2 /*return*/, res.status(500).json({ errors: [{ msg: "Internal server" }] })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.registerUser = registerUser;
var loginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, user, isMatch, payload, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, userModel_1.default.findOne({ username: username }).select("+password")];
            case 1:
                user = _b.sent();
                if (!user)
                    return [2 /*return*/, res.status(404).json({ msg: "User not found!" })];
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
            case 2:
                isMatch = _b.sent();
                if (isMatch) {
                    payload = {
                        id: user.id,
                        email: user.email,
                        username: user.username,
                    };
                    jsonwebtoken_1.default.sign(payload, "" + process.env.JWT_SECRET, { expiresIn: 3600 }, function (err, token) {
                        return res.status(200).json({ token: "Bearer " + token });
                    });
                }
                else {
                    return [2 /*return*/, res.status(403).json({ msg: "Username or password incorrect!" })];
                }
                return [3 /*break*/, 4];
            case 3:
                err_2 = _b.sent();
                return [2 /*return*/, res.status(500).json({ msg: "Internal server" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.loginUser = loginUser;
var getCurrentUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        try {
            user = req.user;
            return [2 /*return*/, res
                    .status(200)
                    .json({ id: user.id, email: user.email, username: user.username })];
        }
        catch (err) {
            return [2 /*return*/, res.status(500).json({ msg: "Internal server" })];
        }
        return [2 /*return*/];
    });
}); };
exports.getCurrentUser = getCurrentUser;
var sendPasswordResetEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, resetPasswordToken, resetUrl, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                email = req.body.email;
                return [4 /*yield*/, userModel_1.default.findOne({ email: email })];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(404).json({ msg: "User not found!" })];
                resetPasswordToken = security.generatePasswordResetToken();
                user.resetPasswordToken = resetPasswordToken;
                user.resetPasswordSentAt = new Date().getTime();
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                resetUrl = req.protocol + "://" + req.get("host") + "/api/recover/";
                return [4 /*yield*/, new Email_1.default(user, resetUrl).sendPasswordResetEmail(resetPasswordToken)];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ msg: "Password recovery email sent" })];
            case 4:
                err_3 = _a.sent();
                res.status(500).json({
                    errors: [{ msg: "Internal server" }],
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.sendPasswordResetEmail = sendPasswordResetEmail;
var resetPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resetPasswordToken, user, _a, password, passwordConfirm, currentTime, hash, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                resetPasswordToken = req.params.resetToken;
                return [4 /*yield*/, userModel_1.default.findOne({ resetPasswordToken: resetPasswordToken })];
            case 1:
                user = _b.sent();
                if (!user)
                    return [2 /*return*/, res.status(404).json({ msg: "Invalid or expired token" })];
                _a = req.body, password = _a.password, passwordConfirm = _a.passwordConfirm;
                if (password !== passwordConfirm)
                    return [2 /*return*/, res.status(400).json({ msg: "Passwords do not match!" })];
                currentTime = Date.now();
                if (!user.resetPasswordSentAt)
                    return [2 /*return*/, res.status(400).json({
                            msg: "We are unable to process your request. Please request another reset link and try again.",
                        })];
                if (currentTime - user.resetPasswordSentAt >= 600000)
                    return [2 /*return*/, res.status(400).json({
                            msg: "Invalid or expired token. Please request another reset link and try again.",
                        })];
                return [4 /*yield*/, security.hashPassword(12, password)];
            case 2:
                hash = _b.sent();
                if (!hash) return [3 /*break*/, 4];
                user.password = hash;
                user.resetPasswordSentAt = undefined;
                user.resetPasswordToken = undefined;
                return [4 /*yield*/, user.save()];
            case 3:
                _b.sent();
                return [3 /*break*/, 5];
            case 4: return [2 /*return*/, res.status(500).json({
                    msg: "Unable to change password. Please request a new link and try again.",
                })];
            case 5: return [2 /*return*/, res.status(200).json({ msg: "Password updated successfully!" })];
            case 6:
                err_4 = _b.sent();
                return [2 /*return*/, res.status(500).json({ msg: "Internal server" })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.resetPassword = resetPassword;
var logoutUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, blacklistedToken, err_5;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
                blacklistedToken = new blacklistModel_1.default({ token: token });
                return [4 /*yield*/, blacklistedToken.save()];
            case 1:
                _b.sent();
                return [2 /*return*/, res
                        .status(200)
                        .json({ msg: "Logged out successfully.", blacklistedToken: blacklistedToken })];
            case 2:
                err_5 = _b.sent();
                return [2 /*return*/, res.status(500).json({ msg: "Internal server" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.logoutUser = logoutUser;
var confirmAccountEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, userModel_1.default.findById(req.params.userId)];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(404).json({
                            msg: "Invalid or incorrect token. We are unable to confirm your email at this time",
                        })];
                if (user.active === true)
                    return [2 /*return*/, res
                            .status(400)
                            .json({ msg: "Bad request: Email for this account already confirmed" })];
                user.active = true;
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        msg: "We successfully confirmed your email!",
                    })];
            case 3:
                err_6 = _a.sent();
                return [2 /*return*/, res.status(500).json({ msg: "Internal server error" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.confirmAccountEmail = confirmAccountEmail;
var resendConfirmationEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, confirmationUrl, confirmationToken, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = req.user;
                if (!user)
                    return [2 /*return*/, res
                            .status(403)
                            .json({ msg: "Must be logged in to access this resource" })];
                if (user.active)
                    return [2 /*return*/, res
                            .status(400)
                            .json({ msg: "This email has already been confirmed!" })];
                confirmationUrl = req.protocol + "://" + req.get("host") + "/api/confirm/";
                confirmationToken = user.id.toString();
                return [4 /*yield*/, new Email_1.default(user, confirmationUrl).sendAccountConfirmationEmail(confirmationToken)];
            case 1:
                _a.sent();
                return [2 /*return*/, res
                        .status(200)
                        .json({ msg: "Resent email to the email address on file." })];
            case 2:
                err_7 = _a.sent();
                return [2 /*return*/, res.status(500).json({ msg: "Internal server error" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.resendConfirmationEmail = resendConfirmationEmail;
var deactivateAccount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, token, blacklistedToken, err_8;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                user = req.user;
                if (!user)
                    return [2 /*return*/, res.status(400).json({
                            msg: "Bad request: unable to deactivate account. Please try again",
                        })];
                if (user.deleted === true)
                    return [2 /*return*/, res.status(400).json({
                            msg: "Bad request: account is already deactivated. Please try again",
                        })];
                token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
                blacklistedToken = new blacklistModel_1.default({ token: token });
                return [4 /*yield*/, blacklistedToken.save()];
            case 1:
                _b.sent();
                return [4 /*yield*/, userModel_1.default.findByIdAndUpdate(user.id, { deleted: true })];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(204).json({ msg: "Account deleted." })];
            case 3:
                err_8 = _b.sent();
                return [2 /*return*/, res.status(500).json({ msg: "Internal server error" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deactivateAccount = deactivateAccount;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, updateObject, confirmationUrl, confirmationToken, err_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                user = req.user;
                updateObject = req.body;
                if (!!("email" in updateObject)) return [3 /*break*/, 3];
                return [4 /*yield*/, userModel_1.default.findByIdAndUpdate(user.id, updateObject)];
            case 2:
                _a.sent();
                return [2 /*return*/, res
                        .status(200)
                        .json({ msg: "Account settings updated successfully." })];
            case 3:
                updateObject.active = false;
                confirmationUrl = req.protocol + "://" + req.get("host") + "/api/confirm/";
                confirmationToken = user.id.toString();
                return [4 /*yield*/, userModel_1.default.findByIdAndUpdate(user.id, updateObject)];
            case 4:
                _a.sent();
                return [4 /*yield*/, new Email_1.default(user, confirmationUrl).sendAccountConfirmationEmail(confirmationToken)];
            case 5:
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        msg: "Account settings successfully updated! Please check your email to confirm your new email.",
                    })];
            case 6:
                err_9 = _a.sent();
                return [2 /*return*/, res.status(500).json({ msg: "Internal server error" })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var auth = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userModel_1.default.findById(req.user.id).select("-password")];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.status(200).json({ user: user })];
            case 2:
                err_10 = _a.sent();
                return [2 /*return*/, res.status(500).json({ msg: "Internal server error" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.auth = auth;
