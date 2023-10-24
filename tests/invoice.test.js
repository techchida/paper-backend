test("create invoice", async () => {
  const data = await require("../controllers/app/createInvoice")({
    userID: "65031756ac5fda33170c67e2",
    company: "643fda79dbfd1e2b1b46f63a",
    items: [
      {
        detail: "hb pencil",
        price: "2500",
        count: 1,
        total: 2500,
      },
      {
        detail: "hb pencil",
        price: "2500",
        count: 1,
        total: 2500,
      },
    ],
    total: 5000,
    created_at: new Date(),
  });
  expect(!data.error).toBeTruthy();
});

test("delete invoice", async () => {
  const data = await require("../controllers/app/deleteInvoice")(
    "650385f3cabcf7496310a8f3",
    "65031756ac5fda33170c67e2"
  );
  expect(data).toBeTruthy();
});
