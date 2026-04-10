import React, { useState } from "react";
import JoinQueue from "./components/JoinQueue";
import QueueStatus from "./components/QueueStatus";

function App() {
  const [userId, setUserId] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <h1>🏥 Smart Hospital Queue System</h1>

      <JoinQueue setUserId={setUserId} />

      <QueueStatus userId={userId} />
    </div>
  );
}

export default App;
<div className="bg-red-500 text-white p-5 text-2xl">Tailwind Working 🚀</div>;
