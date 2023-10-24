const customerRouter = new require("koa-router")();
const authMan = require("../../middleware/authman");
const responseManager = require("../../middleware/responseManager");
customerRouter.use(responseManager);
customerRouter.use(authMan);

customerRouter.post("/create", require("./createCustomer"));
customerRouter.get("/get", require("./getCustomers"));
customerRouter.delete("/delete/:id", require("./delCustomer"));
module.exports = customerRouter;
