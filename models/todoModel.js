const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;
