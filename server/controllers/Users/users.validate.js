const joi = require("@hapi/joi");
const { validate } = require("../../utility/validate");

module.exports = {
  validateRegistration: async (req, res, next) => {
    const schema = joi.object().keys({
      name: joi.string().min(4).required(),
      email: joi.string().required().email(),
      password: joi.string().min(8).required(),
    });
    await validate(schema, req.body, res, next);
  },

  validateLogin: async (req, res, next) => {
    const schema = joi.object().keys({
      email: joi.string().required().email(),
      password: joi.string().min(8).required(),
    });
    await validate(schema, req.body, res, next);
  },
};
