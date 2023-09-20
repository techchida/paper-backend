const companyRouter = new require("koa-router")();
const authMan = require("../../middleware/authman");
const responseManager = require("../../middleware/responseManager");
companyRouter.use(responseManager);
companyRouter.use(authMan);

companyRouter.post("/create", require("./createCompany"));
module.exports = companyRouter;
