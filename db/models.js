const mongoose = require("mongoose");
require("dotenv").config();
const paginate = require("mongoose-paginate-v2");

// const paginate = require("mongoose-paginate-v2");
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, {
  dbName: `zero`,
});

module.exports = models = {
  user: mongoose.model(
    "users",
    new mongoose.Schema({
      fullname: {
        type: String,
        required: true,
        lowercase: true,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
      },
      password: {
        type: String,
        // required: true,
      },
      session: {
        type: String,
      },
      sessionExpiry: {
        type: String,
      },
      status: {
        type: Boolean,
      },
      username: {
        type: String,
      },
      address: {
        type: String,
      },
      birthdate: {
        type: String,
      },
      sessionID: {
        type: String,
      },
      gender: {
        type: String,
      },
      avatar: {
        type: String,
      },
      google: {
        type: Boolean,
      },
      emailVerified: {
        type: Boolean,
      },
      suspended: {
        type: Boolean,
      },
      phone: {
        type: Object,
      },
      created_at: {
        type: String,
      },
      last_modified: {
        type: String,
      },
    })
  ),

  invoice: mongoose.model(
    "invoices",
    new mongoose.Schema({
      userID: {
        type: String,
        required: true,
      },
      invoiceID: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      currency: {
        type: String,
        required: true,
      },
      issued: {
        type: String,
        required: true,
      },
      due: {
        type: String,
        required: true,
      },
      notes: {
        type: String,
      },
      billFrom: {
        type: Object,
        required: true,
      },
      billTo: {
        type: Object,
        required: true,
      },
      items: {
        type: Object,
        required: true,
      },
      total: {
        type: Number,
      },
      created_at: {
        type: Date,
        required: true,
      },
      last_modified: {
        type: String,
      },
      paid: {
        type: Boolean,
        default: false,
      },
      status: {
        type: String,
        default: "unpaid",
      },
    }).plugin(paginate)
  ),
  company: mongoose.model(
    "companies",
    new mongoose.Schema({
      userID: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      logo: {
        type: String,
      },
      address: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      created_at: {
        type: String,
        required: true,
      },
      last_modified: {
        type: String,
      },
      phone: {
        type: String,
      },
    }).plugin(paginate)
  ),
  customer: mongoose.model(
    "customer",
    new mongoose.Schema({
      userID: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      logo: {
        type: String,
      },
      address: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      created_at: {
        type: String,
        required: true,
      },
      last_modified: {
        type: String,
      },
      phone: {
        type: String,
      },
    }).plugin(paginate)
  ),
};
