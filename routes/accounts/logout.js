const { user } = require("../../db/models");
const crypto = require("crypto");

module.exports = logout = async (ctx, next) => {
  try {
    const sesh = crypto.randomUUID();
    const expiry = new Date();

    const update = await user.updateOne(
      { email: ctx.user.email },
      {
        $set: {
          sessionID: sesh,
          sessionExpiry: expiry,
        },
      }
    );

    return (
      (ctx.status = 200),
      (ctx.body = ctx.responder({ message: "you wil be logged out " }))
    );
  } catch (error) {
    console.error("onboarding error", error);
    return (ctx.status = 400), (ctx.message = error.message);
  }
};
