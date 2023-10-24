const Joi = require("joi");

const createInvoiceSchema = (body) => {
  return Joi.object({
    billFrom: Joi.object().required().messages({
      "object.empty": "sender profile is required",
    }),
    billTo: Joi.object().required().messages({
      "object.empty": "customer profile is required",
    }),
    items: Joi.array().required().messages({
      "array.empty": "items cannot be empty",
    }),
    title: Joi.string().min(3).max(255).required().messages({
      "string.min": "title must be at least 3 characters long",
      "string.max": "title cannot excees 255 characters",
      "string.empty": "invoice title is required",
    }),
    currency: Joi.string().min(1).max(255).required().messages({
      "string.min": "currency must be at least 1 characters long",
      "string.max": "currency cannot excees 255 characters",
      "string.empty": "invoice currency is required",
    }),
    notes: Joi.string().min(0).max(255).messages({
      "string.max": "template cannot exceed 255 characters",
    }),
    issued: Joi.string().min(6).required().messages({
      "string.empty": "issue date is required",
    }),
    due: Joi.string().min(6).required().messages({
      "string.empty": "due date is required",
    }),
    total: Joi.number()
      .min(0)
      .max(100000000)
      .message("invoice total must be between 0 and 100000000"),
  }).validate(body);
};

module.exports = createInvoiceSchema;
