const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const { username, email, password, passwordConfirmation } = req.body;

    if (!username || !email || !password || !passwordConfirmation)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    if (password.length < 6)
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 6 characters.",
      });

    if (password !== passwordConfirmation)
      return res.status(400).json({
        errorMessage: "Please enter the same password twice.",
      });

    //checking if there is an existing username or email
    const existingUsername = await User.findOne({ username });
    const existingUserEmail = await User.findOne({ email });

    if (existingUserEmail || existingUsername)
      return res.status(400).json({
        errorMessage: "An account with this username or email already exists.",
      });

    const validateEmail = (testingEmail) => {
      //checking for email@something.com
      const re = /\S+@\S+\.\S+/;
      return re.test(testingEmail);
    };

    if (!validateEmail(email)) {
      return res.status(400).json({
        errorMessage: "Please enter a valid email adress.",
      });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      passwordHash,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(401).json({ errorMessage: "Wrong email or password." });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Wrong email or password." });

    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 4 * 7 * 24 * 60 * 60 * 1000, // 30*  24 * 60 * 60 * 1000 = 1 month
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .send();
});

router.get("/check", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT_SECRET);

    res.send(true);
  } catch (err) {
    res.json(false);
  }
});

module.exports = router;
