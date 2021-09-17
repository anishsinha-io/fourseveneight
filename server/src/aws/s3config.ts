import S3 from "aws-sdk/clients/s3";
import fs from "fs";

const s3Client = new S3({
  region: process.env.AWS_BUCKET_REGION,
  accessKeyId: `${process.env.AWS_ACCESS_KEY}`,
  secretAccessKey: `${process.env.AWS_SECRET_KEY}`,
});

export const uploadFile = (file: any) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: `${process.env.AWS_BUCKET_NAME}`,
    Body: fileStream,
    Key: file.filename,
  };
  s3Client.upload(uploadParams).promise();
};

export const downloadFile = (fileKey: string) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: `${process.env.AWS_BUCKET_NAME}`,
  };
  return s3Client.getObject(downloadParams).createReadStream();
};
