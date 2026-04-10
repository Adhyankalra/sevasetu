import React from "react";
import axios from "axios";

const JoinQueue = ({ setUserId }) => {
  const handleJoin = async () => {
    try {
      // Step 1: Create user automatically
      const userRes = await axios.get("http://localhost:5000/test-db");

      const userId = userRes.data._id;

      // Step 2: Join queue
      await axios.post("http://localhost:5000/api/queue/join", {
        userId,
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
      <button onClick={handleJoin}>Join</button>
    </div>
  );
};

export default JoinQueue;
