const Joi = require("joi");

const createCompany = (body) => {
  return Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
      "string.empty": "company name is required",
      "string.min": "company name must be at least 3 characters",
      "string.max": "company name must not be more than 50 characters",
    }),
    address: Joi.string().min(10).max(125).required().messages({
      "string.empty": "company address is required",
      "string.min": "company address must be at least 10 characters",
      "string.max": "company address must not be more than 125 characters",
    }),
    email: Joi.string()
      .email()
      .message("Please use a valid email address")
      .required(),
    phone: Joi.string()
      .pattern(new RegExp(/^\+(?:[0-9]){1,3}(?:[ -]*[0-9]){12,14}$/))
      .messages({
        "string.empty": "phone number is required",
        "string.pattern.base": "phone nmber must be in international format",
      }),
  }).validate(body);
};

module.exports = createCompany;
