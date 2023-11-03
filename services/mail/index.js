const axios = require("axios");
const baseURL = "https://api.brevo.com/v3";

const SIB = axios.create({
  baseURL,
  headers: {
    "api-key": `${process.env.SIB_TRX}`,
    accept: "application/json",
    "content-type": "application/json",
  },
});

const sendmail = async (data) => {
  try {
    const mailr = await SIB.post("/smtp/email", {
      sender: {
        name: "Paper invoice",
        email: "Notifications@invoicepaper.co",
      },
      to: [
        {
          email: data.email,
          name: "user",
        },
      ],
      subject: "New invoice notification",
      htmlContent: data?.body,
    });
    return {
      result: mailr.data,
    };
  } catch (err) {
    console.error(err);
    return {
      err: "failed to send mail",
    };
  }
};

module.exports = sendmail;
