const createCompany = require("../../controllers/app/createCompany");
const validationService = require("../../services/validation");
const createUserInvoice = async (ctx) => {
  try {
    const validation = validationService.createCompany(ctx.req.body);
    if (validation.error)
      return (
        (ctx.status = 400),
        (ctx.body = ctx.responder({
          message: validation.error.details[0].message,
        }))
      );

    const body = validation.value;
    body.userID = ctx.user._id.toString();
    body.created_at = new Date();

    const create = await createCompany(body);

    if (create.error)
      return (
        (ctx.status = 400),
        (ctx.body = ctx.responder({
          message: create.error,
        }))
      );

    return (
      (ctx.status = 200),
      (ctx.body = ctx.responder({
        message: "success",
      }))
    );
  } catch (error) {
    console.error("create company error", error);
    return (
      (ctx.status = 400), (ctx.body = ctx.responder({ message: error.message }))
    );
  }
};

module.exports = createUserInvoice;
