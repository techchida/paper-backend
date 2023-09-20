const user = require("../../db/models").user;
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = createUser = async (body) => {
  const filter = { email: body.email };
  const person = await user.findOne(filter);

  if (person != null)
    return { status: false, error: "A user with this email address exists" };

  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(body.password, salt);
  body.sessionID = crypto.randomBytes(20).toString("hex");
  body.sessionExpiry = new Date(new Date().getTime() + 60 * 60 * 24 * 1000);

  const token = jwt.sign(
    {
      token: body.sessionID,
      expiry: body.sessionExpiry,
    },
    process.env.JWT_SECRET
  );

  const newPerson = {
    ...body,
    username: `${body.fullname.split(" ")[0]}${crypto.randomInt(
      1000,
      9999
    )}`.toLowerCase(),
    created_at: new Date(),
  };
  await user.create(newPerson);
  return {
    status: true,
    data: {
      message: "signup successful",
      token: token,
    },
  };
};
