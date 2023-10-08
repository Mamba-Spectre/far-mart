const User = require("./users.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { apiFailureMessage } = require("../../constants");

class UserService {
  registerUser = async (data) => {
    const checkEmailExist = await User.findOne({
      email: data.email,
    });

    if (checkEmailExist) {
      throw { status: 400, message: apiFailureMessage.USER_ALREADY_EXISTS };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const user = await new User({
      ...data,
      password: hashedPassword,
    }).save();

    return user;
  };

  loginUser = async (data) => {
    const user = await User.findOne({ email: data.email });
    if (!user) {
      throw { status: 404, message: apiFailureMessage.USER_NOT_FOUND };
    }
    const isPasswordCorrect = await bcrypt.compare(
      data.password,
      user.password
    );
    if (!isPasswordCorrect) {
      throw { status: 400, message: apiFailureMessage.INCORRECT_PASSWORD };
    }

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      process.env.SECRET,
      {
        expiresIn: "7d",
      }
    );

    return { user, token };
  };
}

module.exports = new UserService();
