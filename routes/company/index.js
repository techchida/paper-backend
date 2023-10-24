const companyRouter = new require("koa-router")();
const authMan = require("../../middleware/authman");
const responseManager = require("../../middleware/responseManager");
companyRouter.use(responseManager);
companyRouter.use(authMan);

companyRouter.post("/create", require("./createCompany"));
companyRouter.get("/get", require("./getCompanys"));
companyRouter.delete("/delete/:id", require("./delCompany"));
module.exports = companyRouter;
