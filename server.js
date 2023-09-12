const Koa = require("koa");
const app = new Koa();
const router = require("./src/routes/app.router");
require("dotenv").config();

app.use(router.routes());

app.listen(process.env.PORT || Math.floor(Math.random() * 9999), () =>
  console.log("app listening on port 3k")
);
