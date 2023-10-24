require("dotenv").config();
const router = new require("koa-router")();
const authRouter = require("./auth/");
const invoice = require("./invoice/");
const company = require("./company/");
const customer = require("./customer/");
const user = require("./accounts/");

router.use("/api/v1/auth", authRouter.routes());
router.use("/api/v1/invoice", invoice.routes());
router.use("/api/v1/company", company.routes());
router.use("/api/v1/customer", customer.routes());
router.use("/api/v1/accounts", user.routes());

module.exports = router;
