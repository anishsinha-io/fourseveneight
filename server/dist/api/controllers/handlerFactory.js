"use strict";
//Implements generic template functions
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeGenericProfileField = exports.addGenericProfileField = void 0;
var slugify_1 = __importDefault(require("slugify"));
var profileModel_1 = __importDefault(require("../../models/profileModel"));
var security = __importStar(require("../../auth/security"));
//Profiles
var addGenericProfileField = function (typeInterface, slugField, field) {
    var allowedParams = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        allowedParams[_i - 3] = arguments[_i];
    }
    return function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user, filteredBody, genericFieldObject, finalObject, profileObject, profileObject, profile, err_1, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    user = req.user;
                    filteredBody = security.sanitizeBody.apply(security, __spreadArray([req.body], allowedParams));
                    genericFieldObject = filteredBody;
                    finalObject = void 0;
                    if (slugField === "company") {
                        profileObject = genericFieldObject;
                        if (profileObject.company) {
                            profileObject.slug = slugify_1.default(profileObject.company + "-" + profileObject.title, { lower: true });
                            finalObject = profileObject;
                        }
                        else
                            throw new Error();
                    }
                    else if (slugField === "school") {
                        profileObject = genericFieldObject;
                        if (profileObject.school) {
                            profileObject.slug = slugify_1.default(profileObject.school + "-" + profileObject.degree, { lower: true });
                            finalObject = profileObject;
                        }
                        else
                            throw new Error();
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, profileModel_1.default.findOne({ user: user.id })];
                case 2:
                    profile = _a.sent();
                    if (!profile) return [3 /*break*/, 4];
                    profile.get(field).unshift(finalObject);
                    return [4 /*yield*/, profile.save()];
                case 3:
                    _a.sent();
                    return [2 /*return*/, res.status(200).json({ profile: profile })];
                case 4: return [3 /*break*/, 6];
                case 5:
                    err_1 = _a.sent();
                    return [2 /*return*/, res.status(500).json({ msg: "Internal server error" })];
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_2 = _a.sent();
                    return [2 /*return*/, res.status(500).json({ msg: "Internal server error" })];
                case 8: return [2 /*return*/];
            }
        });
    }); };
};
exports.addGenericProfileField = addGenericProfileField;
var removeGenericProfileField = function (typeInterface, field) {
    return function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user, profile, removeIndex, err_3;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    user = req.user;
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, profileModel_1.default.findOne({ user: user.id })];
                case 2:
                    profile = _c.sent();
                    if (!profile) return [3 /*break*/, 4];
                    removeIndex = (_a = profile
                        .get(field)) === null || _a === void 0 ? void 0 : _a.map(function (item) { return item.slug; }).indexOf(req.params[field + "Slug"]);
                    if (removeIndex !== undefined)
                        (_b = profile.get(field)) === null || _b === void 0 ? void 0 : _b.splice(removeIndex, 1);
                    return [4 /*yield*/, profile.save()];
                case 3:
                    _c.sent();
                    return [2 /*return*/, res.status(200).json({ profile: profile })];
                case 4: return [3 /*break*/, 6];
                case 5:
                    err_3 = _c.sent();
                    return [2 /*return*/, res.status(500).json({ msg: "Internal server error" })];
                case 6: return [2 /*return*/];
            }
        });
    }); };
};
exports.removeGenericProfileField = removeGenericProfileField;
