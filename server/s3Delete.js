const AWS = require("aws-sdk");

const s3 = new AWS.S3();

const s3Delete = async (key) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME, // Replace with your S3 bucket name
    Key: key,
  };

  try {
    const data = await s3.deleteObject(params).promise();
    console.log(`Deleted: ${key}`);
    return true;
  } catch (error) {
    console.error(`Error deleting file: ${key}`, error);
    return false;
  }
};

module.exports = { s3Delete };
