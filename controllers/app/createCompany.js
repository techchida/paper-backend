const { company } = require("../../db/models");

const createCompany = async (data) => {
  try {
    create = await company.create(data);
    return { status: true, _id: create._id.toString() };
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

module.exports = createCompany;
