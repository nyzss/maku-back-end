const router = require("express").Router();
const Todo = require("../models/todoModel");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    const currentUserId = jwt.verify(token, process.env.JWT_SECRET).user;

    const { title, description } = req.body;

    const newTodo = new Todo({
      title,
      description,
      userId: currentUserId,
    });

    const savedTodo = await newTodo.save();

    res.json(savedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    const currentUserId = jwt.verify(token, process.env.JWT_SECRET).user;

    const todos = await Todo.find({ _id: currentUserId });

    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
