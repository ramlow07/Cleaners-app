
const MONGO_URI = "mongodb+srv://luamramlow:ideiafix@authdb.zctju3j.mongodb.net/?retryWrites=true&w=majority";

// for using environment variables
require('dotenv').config();

// importing dependencies
const express = require("express");
const cookieParser = require("cookie-parser");

// importing the routes
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");

// 1. setting the port on which the server will run
const port = process.env.port || 8080

// creating the express app
const app = express();

// 2. adding middleware to parse the cookies and more 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// 3. adding the routes
app.use("/", indexRouter);
app.use("/auth", authRouter);

// 4. starting the server
app.listen(port, function () {
  console.log(`🚀 Listening on port ${port}`);
});


// importing the mongoose module 
const mongoose = require("mongoose");

// connecting to the database 
mongoose.
connect(MONGO_URI, {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connections is established successfully 🎉");
});