require("dotenv").config();

const whitelist = {
  dev: ["http://localhost:5173", "undefined"],
  prod: ["https://invoicepaper.vercel.app", "http://localhost:5173"],
};

const verifyOrigin = (ctx) => {
  // Get requesting origin hostname
  return ctx.headers.origin;
};

module.exports = {
  origin: verifyOrigin,
  allowMethods: ["POST", "PUT", "GET", "OPTIONS", "DELETE", "HEAD"],
  credentials: true,
  allowHeaders: "Content-Type, Authorization, access_key",
};
