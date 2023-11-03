const sendMail = require("../services/mail/");

test("send email", async () => {
  const data = await sendMail({
    email: "codecherub8@gmail.com",
    body: "Hello world",
  });
  expect(data).toBeTruthy();
});
