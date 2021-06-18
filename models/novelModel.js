const mongoose = require("mongoose");

const novelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

const Novel = mongoose.model("novel", novelSchema);

module.exports = Novel;
