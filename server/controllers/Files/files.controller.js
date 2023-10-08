const {
  apiFailureMessage,
  apiSuccessMessage,
  statusCodes,
} = require("../../constants");
const FilesService = require("./files.service");
const multer = require("multer");
const { s3Uploadv2, s3Uploadv3 } = require("../../s3Service");
const { s3Delete } = require("../../s3Delete");

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 1000000000, files: 2 },
});

class FilesController {
  uploadFile = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const results = await s3Uploadv2(req.files);
      console.log(results);
      if (results) {
        const updateDBReponse = await FilesService.updateDBafterUpload(
          userId,
          results
        );
      }
      res.status(statusCodes.SUCCESS).json({
        file: results,
        message: apiSuccessMessage.FILE_CREATED_SUCCESSFULLY,
      });
    } catch (err) {
      return res
        .status(statusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: apiFailureMessage.FILE_UPLOAD_ERROR });
    }
  };

  deleteFile = async (req, res, next) => {
    const userId = req.user.id;
    const {
      params: { id },
    } = req;
    try {
      const deletedFile = await FilesService.deleteFile(id, userId);
      // const deletionResult = await s3Delete(deletedFile?.Key);

      // if (!deletionResult)
      //   return res
      //     .status(statusCodes.NOT_FOUND)
      //     .json({ message: apiFailureMessage.FILE_NOT_FOUND });

      res.status(statusCodes.SUCCESS).json({
        message: apiSuccessMessage.FILE_DELETED_SUCCESSFULLY,
      });
    } catch (error) {
      return res
        .status(statusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: apiFailureMessage.FILE_NOT_FOUND });
    }
  };

  getFileURLbyId = async (req, res, next) => {
    const {
      params: { id },
    } = req;
    try {
      const fileUrl = await FilesService.getFileURLbyId(id);
      if (!fileUrl)
        return res
          .status(statusCodes.NOT_FOUND)
          .json({ message: apiFailureMessage.FILE_NOT_FOUND });

      res.redirect(fileUrl);
    } catch (error) {
      return res
        .status(statusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: apiFailureMessage.FILE_NOT_FOUND });
    }
  };

  getFiles = async (req, res, next) => {
    const userId = req.user.id;
    try {
      const filesData = await FilesService.getFiles(userId);
      if (filesData?.length === 0)
        return res.status(statusCodes.SUCCESS).json({
          data: [],
          message: apiSuccessMessage.FILE_FETCHED_SUCCESSFULLY,
        });

      res.status(statusCodes.SUCCESS).json({
        data: filesData,
        message: apiSuccessMessage.FILE_FETCHED_SUCCESSFULLY,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(statusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: apiFailureMessage.FILE_NOT_FOUND });
    }
  };
}

module.exports = new FilesController();
