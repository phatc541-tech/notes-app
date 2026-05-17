const mongoose = require("mongoose");

// ======================
// USER SCHEMA
// ======================

const userSchema =
  new mongoose.Schema({

    name: {

      type: String,

      required: true

    },

    email: {

      type: String,

      required: true,

      unique: true

    },

    password: {

      type: String,

      required: true

    }

  });

// ======================
// EXPORT
// ======================

module.exports =
  mongoose.model(

    "User",
    userSchema

  );