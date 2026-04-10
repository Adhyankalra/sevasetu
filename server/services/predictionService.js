const estimateWaitMinutes = ({ peopleAhead = 0, avgConsultMinutes = 6 }) => {
  return peopleAhead * avgConsultMinutes;
};

module.exports = { estimateWaitMinutes };
