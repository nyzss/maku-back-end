const router = require("express").Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.get("/me", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    const currentUserId = jwt.verify(token, process.env.JWT_SECRET).user;

    //excluding non used fields from returning, if needed can be easily included again
    const getCurrentUser = await User.findOne(
      { _id: currentUserId },
      "-passwordHash -__v -updatedAt"
    );

    res.json(getCurrentUser);
  } catch (err) {
    res.json(false);
  }
});

router.put("/edit", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    const currentUserId = jwt.verify(token, process.env.JWT_SECRET).user;

    await User.updateOne(
      { _id: currentUserId }, //finding what to edit
      {
        bio: req.body.bio,
        avatarUrl: req.body.avatarUrl,
        updatedAt: Date.now(),
      } // new edited content
    );

    res.json("Successfully updated!");
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = router;
