const express = require("express");
const router = express.Router();

const UserRoutes = require("../controllers/Users/users.routes");
const FileRoutes = require("../controllers/Files/files.routes");

router.use("/users", UserRoutes);
router.use("/files", FileRoutes);

module.exports = router;
