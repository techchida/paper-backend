const { company } = require("../../db/models");

const delCompany = async (ctx) => {
  try {
    const query = { userID: ctx.user._id.toString(), _id: ctx.params.id };
    const user = await company.exists(query);
    if (!user)
      return (
        (ctx.status = 400),
        (ctx.body = ctx.responder({
          data: { message: "invalid profile ID" },
        }))
      );

    await company.findOneAndDelete({ _id: ctx.params.id });

    return (
      (ctx.status = 200),
      (ctx.body = ctx.responder({
        data: { message: "profile removed" },
      }))
    );
  } catch (error) {
    console.error("delete company error", error);
    return (
      (ctx.status = 400),
      (ctx.body = ctx.responder({ message: "something went wrong" }))
    );
  }
};

module.exports = delCompany;
