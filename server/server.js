const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 TEST ROUTE (must work first)
app.get("/test", (req, res) => {
  res.send("TEST OK");
});

// 🔥 SIMPLE DIRECT ROUTE (bypass routes folder)
app.get("/api/properties", (req, res) => {
  res.json([]);
});

// START SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000");
});