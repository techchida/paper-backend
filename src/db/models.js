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
      company: {
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
        type: String,
        required: true,
      },
      last_modified: {
        type: String,
      },
      paid: {
        type: Boolean,
        default: false,
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
};
