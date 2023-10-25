const Koa = require("koa");
const app = new Koa();
const cors = require("@koa/cors");
const router = require("./routes/app.router");
const corsConfig = require("./config/cors");
app.use(require("koa-json-body")({ limit: "10kb", fallback: true }));
app.use(function (ctx, next) {
  console.log(ctx.request.url + " - " + Math.random(10000));
  return next();
});
app.use(cors(corsConfig));
app.use(router.routes());

app.on("error", (err) => {
  console.error("server error", err);
});

app.listen(process.env.PORT || Math.floor(Math.random() * 9999), () =>
  console.log("app listening on port 3k")
);
