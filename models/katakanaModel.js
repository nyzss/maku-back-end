const mongoose = require("mongoose");

const katakanaSchema = new mongoose.Schema({
  kana: {
    type: String,
    required: true,
  },
  roumaji: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const Katakana = mongoose.model("katakana", katakanaSchema, "katakana");

module.exports = Katakana;
