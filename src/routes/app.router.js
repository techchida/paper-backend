require("dotenv").config();
const router = new require("koa-router")();
const authRouter = require("./auth/");
const invoice = require("./invoice/");
const company = require("./company/");

router.use("/api/v1/auth", authRouter.routes());
router.use("/api/v1/invoice", invoice.routes());
router.use("/api/v1/company", company.routes());

module.exports = router;
