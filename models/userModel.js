const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  avatarUrl: {
    type: String,
    default: "https://source.unsplash.com/1600x900/?japan",
  },
  bio: {
    type: String,
    default: "Write something about yourself!",
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
