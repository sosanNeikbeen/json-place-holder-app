const dotenv = require("dotenv");
const aws = require("aws-sdk");
dotenv.config();

const region = process.env.S3_REGION;
const bucketName = process.env.BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

const generateUploadURL = async () => {
  const params = {
    Bucket: bucketName,
    Key: Date.now().toString(),
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
};

module.exports = { generateUploadURL };
