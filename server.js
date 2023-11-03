const Koa = require("koa");
const app = new Koa();
const cors = require("@koa/cors");
const router = require("./routes/app.router");
const corsConfig = require("./config/cors");

app.use(require("koa-json-body")({ limit: "70kb", fallback: true }));

app.use(cors(corsConfig));
app.use(router.routes());

app.on("error", (err) => {
  console.error("server error", err);
});

app.listen(process.env.PORT || Math.floor(Math.random() * 9999), () =>
  console.log("app listening on port 3k")
);
