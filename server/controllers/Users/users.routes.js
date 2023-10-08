const express = require("express");
const router = express.Router();

const UserValidation = require("./users.validate");
const UserController = require("./users.controller");

router.post(
  "/register",
  UserValidation.validateRegistration,
  UserController.registerUser
);
router.post("/login", UserValidation.validateLogin, UserController.loginUser);

module.exports = router;
