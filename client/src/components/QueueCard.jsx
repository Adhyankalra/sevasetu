import React from "react";

const QueueCard = ({ title, value, subtitle }) => (
  <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
    <p className="text-sm uppercase tracking-wide text-slate-400">{title}</p>
    <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    {subtitle ? <p className="mt-1 text-sm text-slate-300">{subtitle}</p> : null}
  </div>
);

export default QueueCard;
