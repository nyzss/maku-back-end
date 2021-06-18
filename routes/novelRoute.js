const router = require("express").Router();
const Novel = require("../models/novelModel");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { name } = req.body;

    const newNovel = new Customer({
      name,
    });

    const savedNovel = await newNovel.save();

    res.json(savedNovel);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const novels = await Novel.find();
    res.json(novels);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
