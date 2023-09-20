const { getUserInvoices } = require("../../controllers/app/getUserInvoices");
const models = require("../../db/models");

module.exports = getInvoices = async (ctx) => {
  try {
    const userInvoices = await getUserInvoices(
      ctx.user._id.toString(),
      ctx.req.query
    );

    if (userInvoices.error)
      return (
        (ctx.status = 400),
        (ctx.body = ctx.responder({
          message: userInvoices.error,
        }))
      );

    return (ctx.body = ctx.responder({
      message: "success",
      ...userInvoices,
    }));
  } catch (error) {
    console.error("onboarding error", error);
    return (ctx.status = 400), (ctx.message = error.message);
  }
};
