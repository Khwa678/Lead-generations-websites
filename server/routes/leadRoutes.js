const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

router.get("/", async (req, res) => {
  const data = await Lead.find();
  res.json(data);
});

module.exports = router; // ✅ VERY IMPORTANT