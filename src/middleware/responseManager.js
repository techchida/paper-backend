module.exports = responsManager = async (ctx, next) => {
  ctx.responder = (data) => {
    return { status: ctx.status === 200 ? "success" : "error", ...data };
  };

  ctx.req = ctx.request;

  return next();
};
