const express = require("express");
const { medicineAvailability } = require("../controllers/dispensaryController");

const router = express.Router();

router.get("/medicines", medicineAvailability);

module.exports = router;
