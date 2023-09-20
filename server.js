const Koa = require("koa");
const app = new Koa();
const router = require("./src/routes/app.router");
app.use(require("koa-json-body")({ limit: "10kb", fallback: true }));

app.use(router.routes());
app.on("error", (err) => {
  console.error("server error", err);
});

app.listen(process.env.PORT || Math.floor(Math.random() * 9999), () =>
  console.log("app listening on port 3k")
);
