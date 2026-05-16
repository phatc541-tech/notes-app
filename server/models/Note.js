const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({

  title: {
    type: String
  },

  content: {
    type: String
  },

  labels: [String],

  isPinned: {

    type: Boolean,

    default: false

  }

}, {

  timestamps: true

});

module.exports = mongoose.model(
  "Note",
  noteSchema
);