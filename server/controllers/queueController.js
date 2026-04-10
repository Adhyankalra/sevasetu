const Queue = require("../models/Queue");

const emitQueueUpdate = (req) => {
  const io = req.app.get("io");
  if (io) {
    io.emit("queueUpdated", { updatedAt: new Date().toISOString() });
  }
};

const joinQueue = async (req, res) => {
  try {
    const { userId, department } = req.body;

    if (!userId || !department) {
      return res.status(400).json({ message: "userId and department are required" });
    }

    const queueItem = await Queue.create({
      userId,
      department,
      status: "waiting",
      createdAt: new Date(),
    });

    const position = await Queue.countDocuments({
      department,
      status: "waiting",
      createdAt: { $lte: queueItem.createdAt },
    });

    emitQueueUpdate(req);

    return res.status(201).json({
      message: "User added to queue",
      queueId: queueItem._id,
      position,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to join queue", error: error.message });
  }
};

const getStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    const queueItem = await Queue.findOne({ userId }).sort({ createdAt: -1 });

    if (!queueItem) {
      return res.status(404).json({ message: "Queue entry not found" });
    }

    if (queueItem.status !== "waiting") {
      return res.json({
        position: 0,
        peopleAhead: 0,
        status: queueItem.status,
      });
    }

    const peopleAhead = await Queue.countDocuments({
      department: queueItem.department,
      status: "waiting",
      createdAt: { $lt: queueItem.createdAt },
    });

    return res.json({
      position: peopleAhead + 1,
      peopleAhead,
      status: queueItem.status,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch status", error: error.message });
  }
};

const getQueueList = async (req, res) => {
  try {
    const filter = { status: "waiting" };
    if (req.query.department) {
      filter.department = req.query.department;
    }

    const queue = await Queue.find(filter).sort({ createdAt: 1 });
    return res.json(queue);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch queue list", error: error.message });
  }
};

const checkInUser = async (req, res) => {
  try {
    const waitingUsers = await Queue.find({ status: "waiting" }).sort({ createdAt: 1 });
    const firstUser = waitingUsers[0];

    if (!firstUser) {
      return res.status(404).json({ message: "No waiting users in queue" });
    }

    firstUser.status = "checked-in";
    await firstUser.save();

    emitQueueUpdate(req);

    return res.json({
      message: "First waiting user checked in",
      user: firstUser,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to check in user", error: error.message });
  }
};

module.exports = {
  joinQueue,
  getStatus,
  getQueueList,
  checkInUser,
};
