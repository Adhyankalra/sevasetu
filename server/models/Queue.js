const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["waiting", "checked-in", "done"],
    default: "waiting",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Queue", queueSchema);
