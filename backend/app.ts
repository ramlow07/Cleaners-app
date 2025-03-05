const MONGO_URI =
  "mongodb+srv://luamramlow:ideiafix@authdb.zctju3j.mongodb.net/?retryWrites=true&w=majority&appName=AuthDB";

require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const cors = require("cors");
const cleanerRouter = require("./routes/cleaner");

const corsOptions = {
  origin: "http://localhost:8080", // Allowing the frontend URL
};
const port = process.env.port || 8080;
const app = express();

app.options(cors());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/cleaners", cleanerRouter);

app.listen(port, function () {
  console.log(`🚀 Listening on port ${port}`);
});

const mongoose = require("mongoose");

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connections is established successfully 🎉");
  });
