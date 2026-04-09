const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    department: {
      type: String, // OPD, Dentist, etc.
    },
    position: Number,

    status: {
      type: String,
      enum: ["waiting", "called", "checked-in", "completed", "skipped"],
      default: "waiting",
    },

    isPriority: {
      type: Boolean,
      default: false,
    },

    joinedAt: {
      type: Date,
      default: Date.now,
    },

    checkedInAt: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Queue", queueSchema);
