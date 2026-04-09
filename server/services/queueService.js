const Queue = require("../models/Queue");

// ➤ Add user to queue
const addToQueue = async (userId, department, isPriority = false) => {
  // Count existing users in queue
  const count = await Queue.countDocuments({
    department,
    status: { $in: ["waiting", "called"] },
  });

  // Priority users go ahead
  let position = count + 1;

  if (isPriority) {
    position = 1;

    // Shift others down
    await Queue.updateMany(
      { department, status: { $in: ["waiting", "called"] } },
      { $inc: { position: 1 } },
    );
  }

  const newEntry = await Queue.create({
    user: userId,
    department,
    position,
    isPriority,
  });

  return newEntry;
};

// ➤ Get user position
const getQueueStatus = async (userId) => {
  const entry = await Queue.findOne({ user: userId });

  if (!entry) return null;

  const peopleAhead = await Queue.countDocuments({
    department: entry.department,
    position: { $lt: entry.position },
    status: { $in: ["waiting", "called"] },
  });

  return {
    position: entry.position,
    peopleAhead,
    status: entry.status,
  };
};

// ➤ Call next patient
const callNext = async (department) => {
  const next = await Queue.findOne({
    department,
    status: "waiting",
  }).sort({ position: 1 });

  if (!next) return null;

  next.status = "called";
  await next.save();

  return next;
};

// ➤ Check-in (QR scan)
const checkIn = async (userId) => {
  const entry = await Queue.findOne({ user: userId });

  if (!entry) return null;

  entry.status = "checked-in";
  entry.checkedInAt = new Date();

  await entry.save();

  return entry;
};

// ➤ Complete service
const completeService = async (userId) => {
  const entry = await Queue.findOne({ user: userId });

  if (!entry) return null;

  entry.status = "completed";
  await entry.save();

  return entry;
};

// ➤ Handle no-show (skip logic)
const handleNoShow = async (department) => {
  const calledUser = await Queue.findOne({
    department,
    status: "called",
  });

  if (!calledUser) return null;

  calledUser.status = "skipped";
  await calledUser.save();

  return calledUser;
};

module.exports = {
  addToQueue,
  getQueueStatus,
  callNext,
  checkIn,
  completeService,
  handleNoShow,
};
