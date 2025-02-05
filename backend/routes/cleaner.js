var express = require("express");
var router = express.Router();
const Cleaner = require("../models/cleaner.js");
const { route } = require("./index.js");

router.get("/", async (req, res) => {
  try {
    const allCleaners = await Cleaner.find();
    res.status(200).json(allCleaners);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cleaners", error: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id.trim();
    const cleaner = await Cleaner.findById(id);
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
  } catch (err) {
    res.status(400).json({ message: "Error creating cleaner", error: err });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const cleanerId = req.params.id;

    const cleanerFound = await Cleaner.findById(cleanerId);
    if (!cleanerFound) {
      return res.status(404).json({ message: "Error finding cleaner" });
    }
    const updatedCleaner = await Cleaner.findByIdAndUpdate(
      cleanerId,
      req.body,
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ message: "cleaner updated successfully", updatedCleaner });
  } catch (err) {
    res.status(400).json({ message: "Error updating cleaner.", error: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const cleanerId = req.params.id;
    const cleanerIdVerify = await Cleaner.findById(cleanerId);

    if (!cleanerIdVerify) {
      return res.status(404).json({ message: "Error finding cleaner." });
    }

    await Cleaner.findByIdAndDelete(cleanerId);
    return res.status(200).json({ message: "Cleaner deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error deleting cleaner.", error: err });
  }
});

module.exports = router;
