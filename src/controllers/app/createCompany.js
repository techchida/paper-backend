const { company } = require("../../db/models");

const createCompany = async (data) => {
  try {
    await company.create(data);
    return true;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

module.exports = createCompany;
