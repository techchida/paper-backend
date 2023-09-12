const Koa = require("koa");
const app = new Koa();
const router = new require("koa-router")();
require("dotenv").config();

app.listen(process.env.PORT || Math.floor(Math.random() * 9999), () =>
  console.log("app listening on port 3k")
);
