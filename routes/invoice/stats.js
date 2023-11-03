const { invoice } = require("../../db/models");

const stats = async (ctx) => {
  try {
    const { _id } = ctx.user;
    const invoices = await invoice.find({ userID: _id });
    const totalInvoices = invoices.length;
    const activeMonth = Number(ctx.req.query.month);

    const chart = await invoice
      .aggregate([
        {
          $project: {
            title: 1,
            userID: 1,
            status: 1,
            created_at: 1,
            month: { $month: { $toDate: "$created_at" } },
          },
        },
        {
          $match: {
            month: activeMonth,
            userID: _id.toString(),
          },
        },
      ])
      .exec();

    const daysInMonth = new Date(
      new Date().getFullYear(),
      activeMonth,
      0
    ).getDate();

    const dates = [];
    for (let i = 1; i < daysInMonth; i++) {
      dates.push(new Date(`${new Date().getFullYear()} ${activeMonth} ${i} `));
    }

    console.log(chart);

    // const totalAmount = invoices.reduce((acc, curr) => {
    //   return acc + curr.amount;
    // }, 0);

    //   get total paid invoices
    const totalPaidInvoices = invoices.filter(
      (invoice) => invoice.status === "paid"
    ).length;

    //   get total paid amount
    // const totalPaidAmount = invoices
    //   .filter((invoice) => invoice.status === "paid")
    //   .reduce((acc, curr) => {
    //     return acc + curr.amount;
    //   }, 0);

    // get total outstanding invoices
    const totalOutstandingInvoices = invoices.filter(
      (invoice) => invoice.status === "unpaid"
    ).length;

    ctx.body = {
      totalInvoices,
      totalPaidInvoices,
      totalOutstandingInvoices,
      chart,
      dates,
    };
  } catch (error) {
    console.error("invoice stats error: ", error);
    ctx.body = {
      message: "something went wrong",
    };
  }
};
module.exports = stats;
