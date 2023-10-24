const accountRouter = new require("koa-router")();
const authMan = require("../../middleware/authman");
const responseManager = require("../../middleware/responseManager");
accountRouter.use(responseManager);
accountRouter.use(authMan);

//user onboarding
accountRouter.get("/profile", require("./profile"));
accountRouter.post("/logout", require("./logout"));

module.exports = accountRouter;
