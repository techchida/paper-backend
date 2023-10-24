const { company } = require("../../db/models");

const getCompanys = async (ctx) => {
  try {
    const query = { userID: ctx.user._id.toString() };
    const options = {
      page: ctx.req.query.page,
      limit: Number(ctx.req.query.limit),
      sort: { $natural: -1 },
      collation: {
        locale: "en",
      },
    };
    const result = await company.paginate(query, options);

    return (
      (ctx.status = 200),
      (ctx.body = ctx.responder({
        data: { ...result },
      }))
    );
  } catch (error) {
    console.error("create company error", error);
    return (
      (ctx.status = 400), (ctx.body = ctx.responder({ message: error.message }))
    );
  }
};

module.exports = getCompanys;
