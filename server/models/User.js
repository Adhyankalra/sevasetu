const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["patient", "admin"],
      default: "patient",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
