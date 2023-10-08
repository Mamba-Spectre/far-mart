const joi = require("@hapi/joi");

const validate = async (schema, reqData, res, next) => {
  try {
    await joi.validate(reqData, schema, {
      abortEarly: false,
      allowUnknown: true,
    });
    next();
  } catch (e) {
    const errors = e.details.map(({ path, message, value }) => ({
      path,
      message,
      value,
    }));
    res.status(400).format({
      json: () => {
        res.send({ message: "Invalid request", errors, code: 400 });
      },
    });
  }
};

module.exports = {
  validate,
};
