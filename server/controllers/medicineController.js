const searchMedicine = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ message: "Medicine name is required" });
  }

  return res.json([
    {
      name: "Apollo Pharmacy",
      distance: "1 km",
      mapsLink: "https://maps.google.com?q=pharmacy",
    },
  ]);
};

module.exports = { searchMedicine };
