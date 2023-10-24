const { invoice } = require("../../db/models");

const stats = async (ctx) => {
  try {
    const { _id } = ctx.user;
    const invoices = await invoice.find({ userID: _id });

    const totalInvoices = invoices.length;
    const totalAmount = invoices.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);
    //   get total paid invoices
    const totalPaidInvoices = invoices.filter(
      (invoice) => invoice.status === "paid"
    ).length;
    //   get total paid amount
    const totalPaidAmount = invoices
      .filter((invoice) => invoice.status === "paid")
      .reduce((acc, curr) => {
        return acc + curr.amount;
      }, 0);
    //   get total outstanding invoices
    const totalOutstandingInvoices = invoices.filter(
      (invoice) => invoice.status === "unpaid"
    ).length;
    ctx.body = {
      totalInvoices,
      totalPaidInvoices,
      totalOutstandingInvoices,
      invoices,
    };
  } catch (error) {
    console.error("invoice stats error: ", error);
    ctx.body = {
      message: "something went wrong",
    };
  }
};
module.exports = stats;
