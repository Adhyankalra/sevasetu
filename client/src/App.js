import React, { useState } from "react";
import JoinQueue from "./components/JoinQueue";
import QueueStatus from "./components/QueueStatus";

function App() {
  const [userId, setUserId] = useState("");

  return (
    <div className="min-h-screen bg-slate-900 p-6 text-white">
      <h1 className="mb-4 text-3xl font-bold text-emerald-400">
        🏥 Smart Hospital Queue System
      </h1>

      <JoinQueue setUserId={setUserId} />

      <QueueStatus userId={userId} />
    </div>
  );
}

export default App;
