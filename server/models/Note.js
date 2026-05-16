const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({

  title: {
    type: String
  },

  content: {
    type: String
  },

  // pin note
  isPinned: {
    type: Boolean,
    default: false
  },

  // user sở hữu
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, {
  timestamps: true
});

module.exports = mongoose.model(
  "Note",
  noteSchema
);