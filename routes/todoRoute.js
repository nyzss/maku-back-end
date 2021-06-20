const router = require("express").Router();
const Todo = require("../models/todoModel");
const auth = require("../middleware/auth");

const jwt = require("jsonwebtoken");

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

    const userId = jwt.verify(token, process.env.JWT_SECRET).user;

    const todos = await Todo.find({ userId }).sort({
      _id: -1,
    });

    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const todoId = req.body.todoId;

    Todo.deleteOne({ _id: todoId });

    res.json("Successfully deleted!");
  } catch (error) {
    console.log(error);
    res.json("Error!");
  }
});

module.exports = router;
