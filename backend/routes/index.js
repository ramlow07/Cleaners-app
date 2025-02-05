var express = require("express");

// creating a router
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.send("Hello Express!! 👋");
});

module.exports = router;
