"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTags = void 0;
var camelize_1 = __importDefault(require("../../util/camelize"));
var getTags = function (req, res) {
    try {
        var categories = req.body.categories;
        var tagsToReturn_1 = [];
        Object.keys(categories).forEach(function (category) {
            return tagsToReturn_1.push(camelize_1.default(category) + "Tags");
        });
        console.log(tagsToReturn_1);
        return res.status(200).json(__assign({}, tagsToReturn_1));
    }
    catch (err) { }
};
exports.getTags = getTags;
