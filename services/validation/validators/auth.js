const Joi = require("joi");

const authSchema = (body) => {
  return Joi.object({
    email: Joi.string().email().message("we could not find this account"),
    password: Joi.string()
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
      .message("sorry we could not find this account"),
  }).validate(body);
};

module.exports = authSchema;
