const Users = require("../../db/models").user;
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

module.exports = auth = async (body) => {
  const defaultErr = {
    status: false,
    error: "Sorry we couldn'nt find this account",
  };

  try {
    const user = await Users.findOne({ email: body.email }).lean();

    if (user === null) return defaultErr;

    if (!bcrypt.compareSync(body.password, user.password)) return defaultErr;
    const sessionID = crypto.randomBytes(20).toString("hex");
    const sessionExpiry = new Date(new Date().getTime() + 60 * 60 * 24 * 1000);

    const token = jwt.sign(
      {
        token: sessionID,
        expiry: sessionExpiry,
      },
      process.env.JWT_SECRET
    );

    await Users.updateOne(
      { email: body.email },
      {
        $set: {
          sessionID: sessionID,
          session: sessionExpiry,
        },
      }
    );

    return {
      status: true,
      data: {
        message: "authentication successful",
        token: token,
      },
    };
  } catch (error) {
    console.error(error);
    return defaultErr;
  }
};
