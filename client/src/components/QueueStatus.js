import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket";

const QueueStatus = ({ userId }) => {
  const [status, setStatus] = useState(null);

  const fetchStatus = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/queue/status/${userId}`,
    );
    setStatus(res.data);
  };

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  useEffect(() => {
    socket.on("queueUpdated", fetchStatus);
    return () => socket.off("queueUpdated");
  }, []);

  if (!userId) return null;

  return (
    <div>
      <h2>Queue Status</h2>
      {status ? (
        <>
          <p>Position: {status.position}</p>
          <p>People Ahead: {status.peopleAhead}</p>
          <p>Status: {status.status}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default QueueStatus;
