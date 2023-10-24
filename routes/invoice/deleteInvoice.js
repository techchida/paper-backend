const deleteInvoice = require("../../controllers/app/deleteInvoice");
const models = require("../../db/models");

const deleteUserInvoice = async (ctx) => {
  try {
    const del = await deleteInvoice(ctx.req.params.id, ctx.user._id);

    if (del.error)
      return (
        (ctx.status = 400),
        (ctx.body = ctx.responder({
          message: del.error,
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

module.exports = deleteUserInvoice;
