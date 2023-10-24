const { customer } = require("../../db/models");

const getCustomers = async (ctx) => {
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
    const result = await customer.paginate(query, options);
    console.log(result);
    return (
      (ctx.status = 200),
      (ctx.body = ctx.responder({
        data: { ...result },
      }))
    );
  } catch (error) {
    console.error("create customer error", error);
    return (
      (ctx.status = 400), (ctx.body = ctx.responder({ message: error.message }))
    );
  }
};

module.exports = getCustomers;
