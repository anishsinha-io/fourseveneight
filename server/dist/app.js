"use strict";
//Implements server
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var cors_1 = __importDefault(require("cors"));
var express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
var db_1 = __importDefault(require("./config/db"));
var userRouter_1 = __importDefault(require("./api/routes/userRouter"));
var adminRouter_1 = __importDefault(require("./api/routes/adminRouter"));
var profileRouter_1 = __importDefault(require("./api/routes/profileRouter"));
var postRouter_1 = __importDefault(require("./api/routes/postRouter"));
var commentRouter_1 = __importDefault(require("./api/routes/commentRouter"));
var tagsRouter_1 = __importDefault(require("./api/routes/tagsRouter"));
var mediaRouter_1 = __importDefault(require("./api/routes/mediaRouter"));
dotenv_1.default.config({ path: "src/config/config.env" });
var app = express_1.default();
app.use(cors_1.default());
process.on("uncaughtException", function () {
    process.exit(1);
});
app.use(express_mongo_sanitize_1.default());
app.use(express_1.default.json());
db_1.default();
app.use(passport_1.default.initialize());
require("./auth/passport")(passport_1.default);
app.use("/api/users", userRouter_1.default);
app.use("/api/admin", adminRouter_1.default);
app.use("/api/profiles", profileRouter_1.default);
app.use("/api/posts", postRouter_1.default);
app.use("/api/comments", commentRouter_1.default);
app.use("/api/tags", tagsRouter_1.default);
app.use("/api/media", mediaRouter_1.default);
var port = process.env.PORT || 8000;
var server = app.listen(port);
process.on("unhandledRejection", function () {
    server.close(function () {
        process.exit(1);
    });
});
