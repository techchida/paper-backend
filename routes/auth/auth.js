const Joi = require("joi");
const validationService = require("../../services/validation/");
const auth = require("../../controllers/auth/auth");

module.exports = create = async (ctx, next) => {
  try {
    const validation = validationService.auth(ctx.request.body);
    if (validation.error)
      return (
        (ctx.status = 400),
        (ctx.body = ctx.responder({
          message: validation.error.details[0].message,
        }))
      );

    const authenticate = await auth(validation.value);
    if (!authenticate.status) {
      return (
        (ctx.status = 400),
        (ctx.body = ctx.responder({ message: authenticate.error }))
      );
    }

    return (
      (ctx.status = 200), (ctx.body = ctx.responder({ ...authenticate.data }))
    );
  } catch (error) {
    console.error("onboarding error", error);
    return (ctx.status = 400), (ctx.body = error.message);
  }
};
