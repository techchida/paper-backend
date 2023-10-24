const jwt = require("jsonwebtoken");
const Users = require("../db/models").user;

const authMan = async (ctx, next) => {
  try {
    if (!ctx.request.headers.authorization)
      return (
        (ctx.status = 401),
        (ctx.body = ctx.responder({
          error:
            "You do not have access to this resource - authorization missing",
        }))
      );

    const token = ctx.request.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    expiry = new Date(decoded.expiry);
    today = new Date();

    const sessionID = decoded.token;

    if (sessionID != decoded.token)
      return (
        (ctx.status = 401),
        (ctx.body = ctx.responder({
          error: "Authentication failed",
        }))
      );

    // check if unique id exists
    const activeSession = await Users.exists({
      sessionID: sessionID,
    });

    if (activeSession === null || sessionID == null)
      return (
        (ctx.status = 401),
        (ctx.body = ctx.responder({
          error: "authentication failed - session invalid",
        }))
      );

    const user = await Users.findOne({
      sessionID: sessionID,
    })
      .lean()
      .exec();

    // check if session is expired
    d1 = new Date(user.session);
    d2 = new Date();
    if (d1 < d2)
      return (
        (ctx.status = 401),
        (ctx.body = ctx.responder({
          error: "Authentication failed -  session expired",
        }))
      );

    // add 24 hours to session
    Users.findOneAndUpdate(
      {
        uID: Number(user.uID),
      },
      {
        session: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
      }
    );

    ctx.user = user;

    return next();
  } catch (error) {
    console.error("auth error;", error);
    return (
      (ctx.status = 401),
      (ctx.body = ctx.responder({
        error: "Authorization Failed! ",
      }))
    );
  }
};

module.exports = authMan;
