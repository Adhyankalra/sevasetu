export default function QueueStatus({ statusData }) {
  if (!statusData) {
    return (
      <div className="rounded-2xl bg-white/95 p-5 shadow-lg">
        <h3 className="text-lg font-semibold text-brand-dark">Queue Status</h3>
        <p className="mt-2 text-slate-600">Join a queue to view your live status.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white/95 p-5 shadow-lg">
      <h3 className="text-lg font-semibold text-brand-dark">Queue Status</h3>
      <div className="mt-3 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-xl bg-brand-light p-3">
          <p className="text-xs uppercase text-slate-500">Position</p>
          <p className="text-xl font-bold text-brand-dark">{statusData.position}</p>
        </div>
        <div className="rounded-xl bg-brand-light p-3">
          <p className="text-xs uppercase text-slate-500">People Ahead</p>
          <p className="text-xl font-bold text-brand-dark">{statusData.peopleAhead}</p>
        </div>
        <div className="rounded-xl bg-brand-light p-3">
          <p className="text-xs uppercase text-slate-500">Status</p>
          <p className="text-xl font-bold text-brand-dark">{statusData.status}</p>
        </div>
      </div>
    </div>
  );
}
