const Joi = require("joi");

const createUserSchema = (body) => {
  return Joi.object({
    fullname: Joi.string()
      .required()
      .min(3)
      .max(30)
      .message("Enter a valid (max 30 chars)"),
    email: Joi.string().email().message("please enter a valid email address"),
    password: Joi.string()
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
      .message(
        "Passwords must follow the convention: minimum of six characters. one uppercase. one number"
      ),
  }).validate(body);
};

module.exports = createUserSchema;
