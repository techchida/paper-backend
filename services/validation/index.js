const validationService = {
  createCompany: require("./validators/createCompany"),
  createInvoice: require("./validators/createInvoice"),
  createUser: require("./validators/createUser"),
  auth: require("./validators/auth"),
};

module.exports = validationService;
