require("dotenv").config();

const whitelist = {
  dev: ["http://localhost:5173", "undefined"],
  prod: ["https://invoicepaper.vercel.app"],
};

const verifyOrigin = (ctx) => {
  // Get requesting origin hostname
  var origin = ctx.headers.origin;
  // Make sure it's a valid origin
  if (whitelist[process.env.NODE_ENV].indexOf(origin) != -1) {
    // Set the header to the requested origin
    ctx.set("Access-Control-Allow-Origin", origin);
    return origin;
  }
};

module.exports = {
  origin: verifyOrigin,
  allowMethods: ["POST", "PUT", "GET", "OPTIONS", "DELETE", "HEAD"],
  credentials: true,
  allowHeaders: "Content-Type, Authorization, access_key",
};
