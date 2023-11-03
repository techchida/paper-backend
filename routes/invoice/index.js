const invoiceRouter = new require("koa-router")();
const authMan = require("../../middleware/authman");
const responseManager = require("../../middleware/responseManager");
invoiceRouter.use(responseManager);
invoiceRouter.use(authMan);

//user onboarding
invoiceRouter.post("/create", require("./createInvoice"));
invoiceRouter.get("/get", require("./getInvoices"));
invoiceRouter.delete("/delete/:id", require("./deleteInvoice"));
invoiceRouter.put("/update", require("./editInvoice"));
invoiceRouter.get("/stats", require("./stats"));
invoiceRouter.post("/send", require("./sendInvoice"));

module.exports = invoiceRouter;
