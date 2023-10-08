const FileSchema = require("./files.schema");

class FilesService {
  updateDBafterUpload = async (userId, results) => {
    const fileDocument = new FileSchema({
      userId,
      Etag: results[0].ETag,
      Key: results[0].Key,
      Location: results[0].Location,
      Bucket: results[0].Bucket,
    });
    await fileDocument.save();
  };

  deleteFile = async (id, userId) => {
    const deletedFile = await FileSchema.findOneAndDelete({
      _id: id,
      userId,
    });
    return deletedFile;
  };

  getFileURLbyId = async (id) => {
    const filesUrl = await FileSchema.findOne({ _id: id });
    return filesUrl?.Location;
  };

  getFiles = async (userId) => {
    console.log(userId);
    const filesData = await FileSchema.find({ userId });
    return filesData;
  };
}

module.exports = new FilesService();
