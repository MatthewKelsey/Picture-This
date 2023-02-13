"use strict";
require('dotenv').config()

const password = process.env.MONGODB_CREDNTIALS
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

mongoose
  .connect(
    password
  )
  .then(console.log('Connected to database'));

module.exports = mongoose;
