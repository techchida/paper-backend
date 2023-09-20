const createUser = require("../../controllers/auth/createUser");
const Joi = require("joi");
const validationService = require("../../services/validation/");

module.exports = create = async (ctx, next) => {
  try {
    console.log(validationService);

    const validation = validationService.createUser(ctx.request.body);
    if (validation.error)
      return (
        (ctx.status = 400),
        (ctx.body = ctx.responder({
          message: validation.error.details[0].message,
        }))
      );

    const onboarding = await createUser(validation.value);
    if (!onboarding.status) {
      return (
        (ctx.status = 400),
        (ctx.body = ctx.responder({ message: onboarding.error }))
      );
    }

    return (
      (ctx.status = 200), (ctx.body = ctx.responder({ ...onboarding.data }))
    );
  } catch (error) {
    console.error("onboarding error", error);
    return (ctx.status = 400), (ctx.message = error.message);
  }
};
