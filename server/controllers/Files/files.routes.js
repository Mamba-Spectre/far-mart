const express = require("express");
const router = express.Router();

const FilesController = require("./files.controller");
const { auth } = require("../../middleware/auth");
const multer = require("multer");
const { s3Uploadv2, s3Uploadv3 } = require("../../s3Service");
const { s3Delete } = require("../../s3Delete");

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 1000000000, files: 2 },
});

router.get("/", auth, FilesController.getFiles);

router.post("/upload", auth, upload.array("file"), FilesController.uploadFile);

router.delete("/:id", auth, FilesController.deleteFile);

router.get("/:id", FilesController.getFileURLbyId);

module.exports = router;
