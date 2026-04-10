const express = require("express");
const Hospital = require("../models/Hospital");

const router = express.Router();

router.get("/nearby", async (req, res) => {
  const hospitals = await Hospital.find().limit(20);
  res.json(hospitals);
});

module.exports = router;
