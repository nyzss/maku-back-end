const router = require("express").Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

router.get("/me", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    const currentUserId = jwt.verify(token, process.env.JWT_SECRET).user;

    const getCurrentUser = await User.findOne({ _id: currentUserId });

    const currentUser = {
      username: getCurrentUser.username,
      email: getCurrentUser.email,
      _id: getCurrentUser._id,
      createdAt: getCurrentUser.createdAt,
    };

    res.json(currentUser);
  } catch (err) {
    res.json(false);
  }
});

module.exports = router;
