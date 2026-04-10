const generateQueueToken = ({ userId, department }) => {
  return `${department}-${userId}-${Date.now()}`;
};

module.exports = { generateQueueToken };
