const {
  addToQueue,
  getQueueStatus,
  checkIn,
} = require("../services/queueService");

// ➤ Join Queue
const joinQueue = async (req, res) => {
  try {
    const { userId, department, isPriority } = req.body;

    const entry = await addToQueue(userId, department, isPriority);

    // 🔥 Emit update
    const io = req.app.get("io");
    io.emit("queueUpdated", { department });

    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ➤ Get Status
const getStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    const status = await getQueueStatus(userId);

    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ➤ Check-in
const checkInUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const entry = await checkIn(userId);

    const io = req.app.get("io");
    io.emit("queueUpdated", { department: entry.department });

    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  joinQueue,
  getStatus,
  checkInUser,
};
