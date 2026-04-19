const express = require("express");
const router = express.Router();
const Property = require("../models/Property");

// GET properties
router.get("/", async (req, res) => {
  try {
    const data = await Property.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;