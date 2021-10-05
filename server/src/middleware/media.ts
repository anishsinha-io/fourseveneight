import { RequestHandler } from "express";
import multer from "multer";
import fs from "fs";
import util from "util";

export const unlinkFile = util.promisify(fs.unlink);

import { uploadFile, downloadFile, deleteFile } from "../aws/s3config";

export const upload = multer({ dest: "uploads/" });

declare module "express-serve-static-core" {
  interface Request {
    imageLink: string;
  }
}

export const uploadImage: RequestHandler = async (req, _, next) => {
  const file = req.file;
  console.log(file);
  if (file) {
    uploadFile(file);
    console.log("asdf");
    req.imageLink = file.path;
    console.log(req.imageLink);
    await unlinkFile(file.path);
  }
  next();
};

export const uploadImages: RequestHandler = async (req, _, next) => {
  try {
    const files = req.files;
  } catch (err) {}
};

export const downloadImage: RequestHandler = async (req, res) => {
  const key = req.params.key;
  console.log(key);
  const readStream = downloadFile(key);
  console.log(readStream);
  if (readStream)
    return readStream
      .on("data", (data) => {
        res.write(data);
      })
      .on("end", () => readStream.pipe(res))
      .on("error", () => res.end());
};

export const deleteImage: RequestHandler = async (req, _, next) => {
  try {
    const key = req.params.key;
    deleteFile(key);
    next();
  } catch (err) {}
};
