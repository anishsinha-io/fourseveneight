import { RequestHandler } from "express";
import multer from "multer";

import { uploadFile, downloadFile } from "../aws/s3config";

export const upload = multer({ dest: "uploads/" });

export const uploadImage: RequestHandler = async (req, res, next) => {
  const file = req.file;
  uploadFile(file);
  next();
};

export const downloadImage: RequestHandler = async (req, res) => {
  const key = req.params.key;
  const readStream = downloadFile(key);
  readStream.pipe(res);
};
