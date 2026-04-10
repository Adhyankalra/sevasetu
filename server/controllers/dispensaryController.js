const Medicine = require("../models/Medicine");

const medicineAvailability = async (req, res) => {
  const medicines = await Medicine.find().limit(50);
  res.json(medicines);
};

module.exports = { medicineAvailability };
