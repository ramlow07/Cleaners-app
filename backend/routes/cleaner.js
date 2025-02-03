var express = require("express");
var router = express.Router();

const Cleaner = require("../models/cleaner");

module.exports = router;

router.get("/", async (req, res) => {
  try {
    const cleaners = await Cleaner.find();
    res.status(200).json(cleaners);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cleaners", error: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const cleaner = await Cleaner.findById(req.params.id);
    if (!cleaner) {
      return res.status(404).json({ message: "Cleaner not found." });
    }
    res.status(200).json(cleaner);
  } catch (err) {
    res.status(500).json({ message: "Error finding cleaner", error: err });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCleaner = new Cleaner(req.body);
    await newCleaner.save();
    res.status(201).json(newCleaner);
    console.log(newCleaner);
  } catch (err) {
    res.status(400).json({ message: "Error creating cleaner", error: err });
  }
});

module.exports = router;
