"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.downloadFile = exports.uploadFile = void 0;
var s3_1 = __importDefault(require("aws-sdk/clients/s3"));
var fs_1 = __importDefault(require("fs"));
var s3Client = new s3_1.default({
    region: process.env.AWS_BUCKET_REGION,
    accessKeyId: "" + process.env.AWS_ACCESS_KEY,
    secretAccessKey: "" + process.env.AWS_SECRET_KEY,
});
var uploadFile = function (file) {
    try {
        var fileStream = fs_1.default.createReadStream(file.path);
        var uploadParams = {
            Bucket: "" + process.env.AWS_BUCKET_NAME,
            Body: fileStream,
            Key: "image-fse-" + file.filename,
        };
        s3Client.upload(uploadParams).promise();
    }
    catch (err) { }
};
exports.uploadFile = uploadFile;
var downloadFile = function (fileKey) {
    try {
        var downloadParams = {
            Key: fileKey,
            Bucket: "" + process.env.AWS_BUCKET_NAME,
        };
        return s3Client.getObject(downloadParams).createReadStream();
    }
    catch (err) { }
};
exports.downloadFile = downloadFile;
var deleteFile = function (fileKey) {
    try {
        var deleteParams = {
            Bucket: "" + process.env.AWS_BUCKET_NAME,
            Key: fileKey,
        };
        s3Client.deleteObject(deleteParams);
    }
    catch (err) { }
};
exports.deleteFile = deleteFile;
