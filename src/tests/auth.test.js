const createUser = require("../controllers/auth/createUser");

// test("create a user account", async () => {
//   const data = await createUser({
//     fullname: "henry",
//     email: `test-user-${Math.floor(Math.random() * 100)}@gmail.co`,
//     password: "test-pw",
//   });
//   expect(data.status).toBeTruthy();
// });

test("authenticate user", async () => {
  const data = await require("../controllers/auth/auth")({
    email: `test-user-35@gmail.co`,
    password: "test-pw",
  });
  expect(data.status).toBeTruthy();
});
