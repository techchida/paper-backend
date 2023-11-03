const sendmail = require("../../services/mail/");
const sendInvoice = (ctx) => {
  try {
    const body = ctx.req.body;
    console.log(body);
    sendmail({
      email: body.email,
      body: `<center style='padding:30px'> <img stye="width:300px" src="${body.data}" /></center>`,
    });

    return (
      (ctx.status = 200),
      (ctx.body = ctx.responder({
        message: "success",
      }))
    );
  } catch (error) {
    console.error("create invoice error", error);
    return (
      (ctx.status = 400), (ctx.body = ctx.responder({ message: error.message }))
    );
  }
};

module.exports = sendInvoice;
