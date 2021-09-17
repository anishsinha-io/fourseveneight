import { RequestHandler } from "express";
import multer from "multer";

import { uploadFile, downloadFile } from "../aws/s3config";

export const upload = multer();

export const uploadImage: RequestHandler = async (req, res) => {
  const file = req.file;
  uploadFile(file);
  return res.status(200).json({ msg: "Successfully sent to s3" });
};

export const downloadImage: RequestHandler = async (req, res) => {
  const key = req.params.key;
  const readStream = downloadFile(key);
  readStream.pipe(res);
};
