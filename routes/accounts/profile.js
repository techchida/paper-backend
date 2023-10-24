const Joi = require("joi");
const auth = require("../../controllers/auth/auth");

module.exports = create = async (ctx, next) => {
  try {
    const profile = {
      email: ctx.user.email,
      fullname: ctx.user.fullname,
      username: ctx.user.username,
    };
    return (ctx.status = 200), (ctx.body = ctx.responder({ data: profile }));
  } catch (error) {
    console.error("user profile error", error);
    return (ctx.status = 400), (ctx.message = error.message);
  }
};
