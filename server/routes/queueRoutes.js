const express = require("express");
const {
  joinQueue,
  getStatus,
  getQueueList,
  checkInUser,
} = require("../controllers/queueController");

const router = express.Router();

router.post("/join", joinQueue);
router.get("/status/:userId", getStatus);
router.get("/list", getQueueList);
router.post("/checkin", checkInUser);

module.exports = router;
