import React, { useState } from "react";
import { joinQueue } from "../services/queueService";

const QueuePage = ({ onJoined }) => {
  const [department, setDepartment] = useState("OPD");
  const [isPriority, setIsPriority] = useState(false);

  const handleJoin = async () => {
    const data = await joinQueue({ department, isPriority });
    onJoined(data.userId);
  };

  return (
    <section className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <h2 className="mb-3 text-xl font-semibold">Join Queue</h2>
      <div className="grid gap-2 md:grid-cols-3">
        <select className="rounded border border-slate-600 bg-slate-900 px-3 py-2" value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="OPD">OPD</option>
          <option value="Dentist">Dentist</option>
          <option value="ENT">ENT</option>
        </select>
        <label className="flex items-center gap-2 rounded border border-slate-600 bg-slate-900 px-3 py-2">
          <input type="checkbox" checked={isPriority} onChange={(e) => setIsPriority(e.target.checked)} />
          Priority
        </label>
        <button onClick={handleJoin} className="rounded bg-emerald-500 px-3 py-2 font-medium text-slate-900">Join Queue</button>
      </div>
    </section>
  );
};

export default QueuePage;
