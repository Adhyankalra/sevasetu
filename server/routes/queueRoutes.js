const express = require("express");
const router = express.Router();

const {
  joinQueue,
  getStatus,
  checkInUser,
} = require("../controllers/queueController");

// POST /api/queue/join
router.post("/join", joinQueue);

// GET /api/queue/status/:userId
router.get("/status/:userId", getStatus);

// POST /api/queue/checkin
router.post("/checkin", checkInUser);

module.exports = router;
