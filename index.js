const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["https://maku.netlify.app", "http://localhost:3000"],
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/auth", require("./routes/authRoute"));
app.use("/todo", require("./routes/todoRoute"));
app.use("/kana", require("./routes/kanaRoute"));
app.use("/users", require("./routes/usersRoute"));

mongoose.connect(
  process.env.MONGO_DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`Server started on http://localhost:${PORT}`)
    );
  }
);
