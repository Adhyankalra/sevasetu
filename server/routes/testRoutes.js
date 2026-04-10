const express = require("express");
const router = express.Router();
const { getTest, createDemoUser } = require("../controllers/testController");

router.get("/", getTest);
router.get("/demo-user", createDemoUser);

module.exports = router;
