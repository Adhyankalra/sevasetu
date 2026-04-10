import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket";

const QueueStatus = ({ userId }) => {
  const [status, setStatus] = useState(null);

  const fetchStatus = useCallback(async () => {
    if (!userId) {
      setStatus(null);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/api/queue/status/${userId}`,
      );
      setStatus(res.data);
    } catch (error) {
      console.error("Failed to fetch queue status:", error);
      setStatus(null);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    // initial fetch
    fetchStatus();

    // listen for updates
    socket.on("queueUpdated", (data) => {
      if (data.userId === userId) {
        setStatus(data);
      }
    });

    return () => {
      socket.off("queueUpdated");
    };
  }, [userId]);

  useEffect(() => {
    socket.on("queueUpdated", fetchStatus);
    return () => socket.off("queueUpdated", fetchStatus);
  }, [fetchStatus]);

  if (!userId) return null;

  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <h2 className="mb-3 text-xl font-semibold">Queue Status</h2>
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
