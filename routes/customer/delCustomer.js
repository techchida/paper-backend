const { customer } = require("../../db/models");

const delCustomer = async (ctx) => {
  try {
    const query = { userID: ctx.user._id.toString(), _id: ctx.params.id };
    const user = await customer.exists(query);
    if (!user)
      return (
        (ctx.status = 400),
        (ctx.body = ctx.responder({
          data: { message: "invalid profile ID" },
        }))
      );

    await customer.findOneAndDelete({ _id: ctx.params.id });

    return (
      (ctx.status = 200),
      (ctx.body = ctx.responder({
        data: { message: "profile removed" },
      }))
    );
  } catch (error) {
    console.error("delete customer error", error);
    return (
      (ctx.status = 400),
      (ctx.body = ctx.responder({ message: "something went wrong" }))(
        (ctx.body = ctx.responder({ message: "something went wrong" }))
      )
    );
  }
};

module.exports = delCustomer;
