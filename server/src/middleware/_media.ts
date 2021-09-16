import multer from "multer";

import { uploadFile } from "../aws/s3config";

//Import as middleware in profile and post routes
export const upload = multer({ dest: "uploads/" });

export const uploadImage = async () => {};
