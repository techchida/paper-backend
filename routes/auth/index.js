const authRouter = new require("koa-router")();
const responseManager = require("../../middleware/responseManager");
authRouter.use(responseManager);

//user onboarding
authRouter.post("/create", require("./create"));
authRouter.post("/auth", require("./auth"));

module.exports = authRouter;
