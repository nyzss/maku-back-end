const router = require("express").Router();
const Hiragana = require("../models/hiraganaModel");
const Katakana = require("../models/katakanaModel");

router.get("/hiragana", async (_, res) => {
  try {
    // --- //
    // const hiraganas = await Hiragana.find({}, "-_id");
    //it does not return the _id, it's most likely going to not be used
    // if it is used i'll just remove the "-_id"

    //had to put a key and a couple of extra kbs cant hurt, right? RIGHT?!
    const hiraganas = await Hiragana.find({});

    res.json(hiraganas);
    // --- //
  } catch (error) {
    res.json("Error at hiragana!");
  }
});

router.get("/katakana", async (_, res) => {
  try {
    const katakanas = await Katakana.find({});

    res.json(katakanas);
  } catch (error) {
    res.json("Error at katakana!");
  }
});

module.exports = router;
