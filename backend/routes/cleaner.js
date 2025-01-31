var express = require("express");
var router = express.Router();

const Cleaner = require("..models/cleanr");

router.get("/", async (req, res) => {
  try {
    const cleaners = await Cleaner.find();
    res.status(200).json(cleaners);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cleaners", error: err });
  }
});
