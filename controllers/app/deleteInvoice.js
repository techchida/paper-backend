const invoiceModel = require("../../db/models").invoice;

const deleteInvoice = async (invoiceID, userID) => {
  try {
    const filter = { _id: invoiceID, userID: userID };
    const invoice = await invoiceModel.findOne(filter);

    if (invoice === null)
      return { error: "Sorry we could not find this invoice" };

    const del = await invoiceModel.deleteOne(filter);

    return true;
  } catch (error) {
    console.error(error);
    return {
      error: "something went wrong with your request. Please try again",
    };
  }
};

module.exports = deleteInvoice;
