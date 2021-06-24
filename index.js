const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();
const app = express();

// i'm trying this, if it doesnt work then idk what does
const corsOptions = {
  origin: [
    "https://maku.netlify.app/",
    "http://maku.netlify.app/",
    "maku.netlify.app/",
  ],
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
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

app.use("/auth", require("./routes/authRoute"));
app.use("/todo", require("./routes/todoRoute"));
app.use("/kana", require("./routes/kanaRoute"));
app.use("/users", require("./routes/usersRoute"));
