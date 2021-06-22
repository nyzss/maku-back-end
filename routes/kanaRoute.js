const router = require("express").Router();
const Hiragana = require("../models/hiraganaModel");
const Katakana = require("../models/katakanaModel");

router.get("/hiragana", async (_, res) => {
  try {
    // --- //
    const hiraganas = await Hiragana.find({}, "-_id");
    //it does not return the _id, it's most likely going to not be used
    // if it is used i'll just remove the "-_id"

    res.json(hiraganas);
    // --- //
  } catch (error) {
    res.json("Error at hiragana!");
  }
});

router.get("/katakana", async (_, res) => {
  try {
    //not sending the _id too because i dont need to
    const katakanas = await Katakana.find({}, "-_id");

    res.json(katakanas);
  } catch (error) {
    res.json("Error at katakana!");
  }
});

module.exports = router;
