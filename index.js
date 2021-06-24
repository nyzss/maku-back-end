const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();
const app = express();

// probably dumb but i'm trying this, if it doesnt work then idk what does
const corsOptions = {
  origin: [
    "https://maku.netlify.app/",
    "http://maku.netlify.app/",
    "maku.netlify.app/",
  ],
  credentials: true,
};
app.options("*", cors());
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

// probably dumb but i'm trying this, if it doesnt work then idk what does
app.use("/auth", cors(corsOptions), require("./routes/authRoute"));
app.use("/todo", cors(corsOptions), require("./routes/todoRoute"));
app.use("/kana", cors(corsOptions), require("./routes/kanaRoute"));
app.use("/users", cors(corsOptions), require("./routes/usersRoute"));
