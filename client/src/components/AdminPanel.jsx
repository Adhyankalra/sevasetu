import { api } from "../api";

export default function AdminPanel({ queueList, onRefresh }) {
  const callNext = async () => {
    await api.post("/api/queue/checkin");
    onRefresh();
  };

  return (
    <div className="rounded-2xl bg-white/95 p-5 shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-brand-dark">Admin Panel</h3>
        <button
          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
          onClick={callNext}
        >
          Call Next Patient
        </button>
      </div>
      <ul className="mt-4 space-y-2">
        {queueList.map((item, index) => (
          <li key={item._id} className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2">
            <span className="text-sm font-medium text-slate-700">
              #{index + 1} {item.userId} ({item.department})
            </span>
            <span className="rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-700">{item.status}</span>
          </li>
        ))}
        {queueList.length === 0 && <li className="text-sm text-slate-500">No waiting users.</li>}
      </ul>
    </div>
  );
}
