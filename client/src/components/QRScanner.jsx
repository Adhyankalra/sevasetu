import React, { useState } from "react";

const QRScanner = ({ onCheckIn }) => {
  const [mockToken, setMockToken] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mockToken.trim()) return;
    onCheckIn(mockToken.trim());
    setMockToken("");
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <h3 className="mb-2 text-lg font-semibold">QR Check-in (Demo)</h3>
      <p className="mb-3 text-sm text-slate-300">Paste a queue/user token to simulate QR scanning.</p>
      <div className="flex gap-2">
        <input
          value={mockToken}
          onChange={(e) => setMockToken(e.target.value)}
          placeholder="Enter token"
          className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-white"
        />
        <button type="submit" className="rounded bg-emerald-500 px-4 py-2 font-medium text-slate-900 hover:bg-emerald-400">
          Check-in
        </button>
      </div>
    </form>
  );
};

export default QRScanner;
