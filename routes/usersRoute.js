const router = require("express").Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

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
      avatarUrl: getCurrentUser.avatarUrl,
      bio: getCurrentUser.bio,
    };

    res.json(currentUser);
  } catch (err) {
    res.json(false);
  }
});

router.post("/edit", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    const currentUserId = jwt.verify(token, process.env.JWT_SECRET).user;
    const getCurrentUser = await User.findOne({ _id: currentUserId });

    if (getCurrentUser == null) {
      res.json(false);
    }

    if (req.body.avatarUrl && req.body.bio) {
      getCurrentUser.bio = await req.body.bio;

      getCurrentUser.avatarUrl = await req.body.avatarUrl;

      await getCurrentUser.save();
      res.json("Successfully updated bio and avatar!");
    } else if (req.body.avatarUrl) {
      getCurrentUser.avatarUrl = await req.body.avatarUrl;
      getCurrentUser.bio = await getCurrentUser.bio;

      await getCurrentUser.save();

      res.json("Successfully updated avatar!");
    } else if (req.body.bio) {
      getCurrentUser.bio = await req.body.bio;
      getCurrentUser.avatarUrl = await getCurrentUser.avatarUrl;

      await getCurrentUser.save();

      res.json("Successfully updated bio!");
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

// router.post("/bio", auth, async (req, res) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) return res.json(false);

//     const bio = req.body.bio;

//     const currentUserId = jwt.verify(token, process.env.JWT_SECRET).user;
//     const getCurrentUser = await User.findOne({ _id: currentUserId });

//     getCurrentUser.bio = bio;

//     await getCUrrentUser.save();

//     res.json("Success!");
//   } catch (error) {
//     res.json("Error at bio!");
//   }
// });

module.exports = router;
