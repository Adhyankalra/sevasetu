import React from "react";
import QueueCard from "../components/QueueCard";

const Dashboard = ({ status }) => {
  if (!status) return null;

  return (
    <section className="grid gap-4 md:grid-cols-3">
      <QueueCard title="Position" value={status.position ?? "-"} />
      <QueueCard title="People Ahead" value={status.peopleAhead ?? "-"} />
      <QueueCard title="Status" value={status.status ?? "waiting"} subtitle="Live queue status" />
    </section>
  );
};

export default Dashboard;
