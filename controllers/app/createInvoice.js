const { invoice, company } = require("../../db/models");

const createInvoice = async (data) => {
  try {
    console.log(data);

    // data.company = await company
    //   .findOne({
    //     userID: data.userID,
    //     _id: data.company,
    //   })
    //   .lean();

    // if (data.company === null)
    //   return { error: "could not assign invoice to company" };

    await invoice.create(data);
    return true;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

module.exports = createInvoice;
