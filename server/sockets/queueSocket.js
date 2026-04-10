const setupQueueSocket = (io) => {
  io.on("connection", (socket) => {
    socket.on("joinDepartment", (department) => {
      socket.join(`department:${department}`);
    });

    socket.on("disconnect", () => {
      // connection closed
    });
  });
};

module.exports = { setupQueueSocket };
