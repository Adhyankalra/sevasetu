const {
  addToQueue,
  getQueueStatus,
  checkIn,
} = require("../services/queueService");

// =======================
// JOIN QUEUE
// =======================
const joinQueue = async (req, res) => {
  try {
    const { userId, department, isPriority } = req.body;

    // validation
    if (!userId || !department) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const entry = await addToQueue(userId, department, isPriority);

    // ✅ get io inside controller
    const io = req.app.get("io");

    io.emit("queueUpdated", {
      userId,
      position: entry.position,
      peopleAhead: entry.position - 1,
      status: "waiting",
    });

    res.status(201).json({
      message: "Joined queue successfully",
      data: entry,
    });
  } catch (error) {
    console.error("Join Queue Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// =======================
// GET QUEUE STATUS
// =======================
const getStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    const status = await getQueueStatus(userId);

    if (!status) {
      return res.status(404).json({ message: "User not found in queue" });
    }

    res.json(status);
  } catch (error) {
    console.error("Get Status Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// =======================
// CHECK-IN USER
// =======================
const checkInUser = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "UserId required" });
    }

    const entry = await checkIn(userId);

    // ✅ get io inside controller
    const io = req.app.get("io");

    io.emit("queueUpdated", {
      userId,
      department: entry.department,
      status: "checked-in",
    });

    res.json({
      message: "User checked in successfully",
      data: entry,
    });
  } catch (error) {
    console.error("Check-in Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// =======================
// EXPORTS
// =======================
module.exports = {
  joinQueue,
  getStatus,
  checkInUser,
};
