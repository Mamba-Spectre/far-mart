const userService = require("./users.service");
const { apiSuccessMessage } = require("../../constants");

class UserController {
  registerUser = async (req, res) => {
    try {
      console.log(req.body);
      const user = await userService.registerUser(req.body);
      res.json({
        message: apiSuccessMessage.USER_SAVED_SUCCESSFULLY,
        statusCode: 200,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  loginUser = async (req, res) => {
    try {
      const { user, token } = await userService.loginUser(req.body);
      res.status(200).json({
        message: apiSuccessMessage.USER_LOGGED_IN_SUCCESSFULLY,
        token,
        statusCode: 200,
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
}

module.exports = new UserController();
