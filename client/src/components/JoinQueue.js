import React, { useState } from "react";
import axios from "axios";

const JoinQueue = ({ setUserId }) => {
  const [input, setInput] = useState("");

  const handleJoin = async () => {
    try {
      // Step 1: Create user automatically
      const userRes = await axios.get("http://localhost:5000/test-db");

      const userId = userRes.data._id;

      // Step 2: Join queue
      await axios.post("/api/queue/join", {
        userId: input,
        department: "OPD",
        isPriority: false,
      });

      setUserId(userId);
      alert("Joined Queue 🚀");
    } catch (err) {
      console.error(err);
      alert("Error joining queue");
    }
  };

  return (
    <div>
      <h2>Join Queue</h2>
      <input
        placeholder="Enter User ID"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleJoin}>Join</button>
    </div>
  );
};

export default JoinQueue;
