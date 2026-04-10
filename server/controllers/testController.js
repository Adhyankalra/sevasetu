const User = require("../models/User");

const getTest = (req, res) => {
  res.json({
    message: "Backend is working 🚀",
  });
};

const createDemoUser = async (req, res) => {
  try {
    const user = await User.create({
      name: "Test User",
      phone: Date.now().toString(),
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getTest, createDemoUser };
