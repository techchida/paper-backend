const invoiceModel = require("../../db/models").invoice;

const editInvoice = async (invoiceID, userID) => {
  try {
    const filter = { _id: invoiceID, userID: userID };
    const invoice = await invoiceModel.findOne(filter);

    if (invoice === null)
      return { error: "Sorry we could not find this invoice" };

    // update invoice status;
    const result = await invoiceModel.updateOne(
      { _id: invoice._id },
      { $set: { status: "paid" } }
    );

    if (result.nModified === 0)
      return { error: "Sorry we could not update this invoice" };

    return true;
  } catch (error) {
    console.error(error);
    return {
      error: "something went wrong with your request. Please try again",
    };
  }
};

module.exports = editInvoice;
