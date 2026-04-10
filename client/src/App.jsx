import React, { useCallback, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import QRScanner from "./components/QRScanner";
import Home from "./pages/Home";
import Login from "./pages/Login";
import QueuePage from "./pages/QueuePage";
import Dashboard from "./pages/Dashboard";
import Dispensary from "./pages/Dispensary";
import socket from "./socket/socket";
import { checkInQueue, fetchQueueStatus } from "./services/queueService";

const App = () => {
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState(null);

  const refreshStatus = useCallback(async () => {
    if (!userId) return;
    const data = await fetchQueueStatus(userId);
    setStatus(data);
  }, [userId]);

  useEffect(() => {
    refreshStatus();
  }, [refreshStatus]);

  useEffect(() => {
    socket.on("queueUpdated", refreshStatus);
    return () => socket.off("queueUpdated", refreshStatus);
  }, [refreshStatus]);

  const handleJoined = (joinedUserId) => {
    setUserId(joinedUserId);
  };

  const handleCheckIn = async (token) => {
    await checkInQueue(token || userId);
    await refreshStatus();
  };

  return (
    <main className="min-h-screen bg-slate-900 p-6 text-white">
      <div className="mx-auto grid max-w-6xl gap-4">
        <Navbar />
        <Home />
        <Login />
        <QueuePage onJoined={handleJoined} />
        <Dashboard status={status} />
        <QRScanner onCheckIn={handleCheckIn} />
        <Dispensary />
      </div>
    </main>
  );
};

export default App;
