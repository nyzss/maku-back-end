const router = require("express").Router();
const Hiragana = require("../models/hiraganaModel");

router.get("/hiragana", async (req, res) => {
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

module.exports = router;
