const { customer } = require("../../db/models");

const createCustomer = async (data) => {
  try {
    create = await customer.create(data);
    return { status: true, _id: create._id.toString() };
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

module.exports = createCustomer;
