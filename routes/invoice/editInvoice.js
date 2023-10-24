const Joi = require("joi");
const editInvoice = require("../../controllers/app/editInvoice");

const editUserInvoice = async (ctx) => {
  try {
    //  validate with joi
    const validation = Joi.object({
      id: Joi.string().required(),
    }).validate(ctx.request.body);

    if (validation.error)
      return (
        (ctx.status = 400),
        (ctx.body = ctx.responder({
          message: validation.error.details[0].message,
        }))
      );

    //update invoice status
    const update = await editInvoice(validation.value.id, ctx.user._id);

    if (update.error)
      return (
        (ctx.status = 400),
        (ctx.body = ctx.responder({
          message: update.error,
        }))
      );

    return (
      (ctx.status = 200),
      (ctx.body = ctx.responder({
        message: "success",
      }))
    );
  } catch (error) {
    console.error("onboarding error", error);
    return (ctx.status = 400), (ctx.message = error.message);
  }
};

module.exports = editUserInvoice;
