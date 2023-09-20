const Joi = require("joi");

const createInvoiceSchema = (body) => {
  return Joi.object({
    company: Joi.string()
      .pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
      .required()
      .messages({
        "string.empty": "company id is required",
        "string.pattern.base": "invalid company id",
      }),
    items: Joi.array().required().messages({
      "array.empty": "items cannot be empty",
    }),
    total: Joi.number().min(1).max(10000000).message("invalid total range"),
  }).validate(body);
};

module.exports = createInvoiceSchema;
