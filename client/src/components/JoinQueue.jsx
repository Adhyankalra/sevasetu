import { useState } from "react";
import { api } from "../api";

const departments = ["General", "Orthopaedics", "Cardiology", "ENT"];

export default function JoinQueue({ onJoined }) {
  const [userId, setUserId] = useState("");
  const [department, setDepartment] = useState(departments[0]);
  const [position, setPosition] = useState(null);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await api.post("/api/queue/join", { userId, department });
      setPosition(data.position);
      onJoined(userId);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to join queue");
    }
  };

  return (
    <div className="rounded-2xl bg-white/95 p-5 shadow-lg">
      <h3 className="text-lg font-semibold text-brand-dark">Join Hospital Queue</h3>
      <form className="mt-4 space-y-3" onSubmit={submit}>
        <input
          className="w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-brand-base"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
          required
        />
        <select
          className="w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-brand-base"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          {departments.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <button className="w-full rounded-xl bg-brand-base px-4 py-2 font-semibold text-white transition hover:bg-brand-dark">
          Join Queue
        </button>
      </form>
      {position && <p className="mt-3 text-sm text-slate-700">Token generated. Your position is #{position}.</p>}
      {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}
    </div>
  );
}
