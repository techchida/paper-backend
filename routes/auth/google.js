const { user } = require("../../db/models");
const createUser = require("../../controllers/auth/createUser");
const crypto = require("crypto");
const axios = require("axios");
const jwt = require("jsonwebtoken");

module.exports = google = async (ctx, next) => {
  try {
    const xtoken = ctx.req.body.access_token.toString();
    const options = {
      headers: {
        Authorization: `Bearer ${xtoken}`,
      },
    };
    const verify = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo`,
      options
    );

    const googleProfile = verify.data;
    const sessionID = crypto.randomBytes(20).toString("hex");

    const googleUser = {
      fullname: googleProfile.name,
      email: googleProfile.email,
      password: crypto.randomBytes(20).toString("hex"),
    };

    if (await user.exists({ email: googleUser.email })) {
      const sessionExpiry = new Date(
        new Date().getTime() + 60 * 60 * 24 * 1000
      );

      const token = jwt.sign(
        {
          token: sessionID,
          expiry: sessionExpiry,
        },
        process.env.JWT_SECRET
      );

      await user.updateOne(
        { email: googleUser.email },
        {
          $set: {
            sessionID: sessionID,
            session: sessionExpiry,
          },
        }
      );

      return (ctx.status = 200), (ctx.body = ctx.responder({ token: token }));
      // did user has signed up with google ?
    }

    const onboarding = await createUser(googleUser);

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
    console.error(" google onboarding error", error);
    return (ctx.status = 400), (ctx.message = error.message);
  }
};
