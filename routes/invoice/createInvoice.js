const createInvoice = require("../../controllers/app/createInvoice");
const validationService = require("../../services/validation");
const utils = require("../../utils/util");
const createUserInvoice = async (ctx) => {
  try {
    const validation = validationService.createInvoice(ctx.req.body);

    if (validation.error)
      return (
        (ctx.status = 400),
        (ctx.body = ctx.responder({
          message: validation.error.details[0].message,
        }))
      );

    const body = validation.value;
    //generate a six character alphanumeric id
    body.invoiceID = utils.randStr(8);
    body.userID = ctx.user._id.toString();
    body.created_at = new Date();

    const create = await createInvoice(body);

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
        invoiceID: body.invoiceID,
      }))
    );
  } catch (error) {
    console.error("create invoice error", error);
    return (
      (ctx.status = 400), (ctx.body = ctx.responder({ message: error.message }))
    );
  }
};

module.exports = createUserInvoice;
