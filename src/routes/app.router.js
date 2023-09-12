const router = new require("koa-router")();
const authRouter = require("./auth/");

router.use("/api/v1/auth", authRouter.routes());

module.exports = router;
