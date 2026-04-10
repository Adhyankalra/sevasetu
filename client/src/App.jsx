import { useEffect, useState } from "react";
import { api } from "./api";
import { socket } from "./socket";
import JoinQueue from "./components/JoinQueue";
import QueueStatus from "./components/QueueStatus";
import AdminPanel from "./components/AdminPanel";
import MedicineSearch from "./components/MedicineSearch";

function App() {
  const [tab, setTab] = useState("queue");
  const [searchText, setSearchText] = useState("");
  const [activeUserId, setActiveUserId] = useState("");
  const [statusData, setStatusData] = useState(null);
  const [queueList, setQueueList] = useState([]);

  const fetchQueueList = async () => {
    const { data } = await api.get("/api/queue/list");
    setQueueList(data);
  };

  const fetchStatus = async (userId) => {
    if (!userId) return;
    try {
      const { data } = await api.get(`/api/queue/status/${encodeURIComponent(userId)}`);
      setStatusData(data);
    } catch (_error) {
      setStatusData(null);
    }
  };

  useEffect(() => {
    fetchQueueList();

    socket.on("queueUpdated", () => {
      fetchQueueList();
      fetchStatus(activeUserId);
    });

    return () => {
      socket.off("queueUpdated");
    };
  }, [activeUserId]);

  const handleJoined = async (userId) => {
    setActiveUserId(userId);
    await fetchStatus(userId);
    await fetchQueueList();
  };

  return (
    <div className="min-h-screen px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-3xl space-y-4">
        <nav className="rounded-2xl bg-white/90 px-5 py-4 shadow-lg">
          <h1 className="text-2xl font-bold text-brand-dark">SevaSetu</h1>
          <p className="text-sm text-slate-500">Healthcare Queue & Medicine Finder</p>
        </nav>

        <div className="rounded-2xl bg-white/90 p-4 shadow-lg">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-brand-base"
            placeholder="Search"
          />

          <div className="mt-4 grid grid-cols-3 gap-2 text-sm font-semibold">
            {[
              ["queue", "Queue"],
              ["medicine", "Medicines"],
              ["navigation", "Navigation"],
            ].map(([key, label]) => (
              <button
                key={key}
                className={`rounded-xl px-3 py-2 transition ${
                  tab === key ? "bg-brand-dark text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
                onClick={() => setTab(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {tab === "queue" && (
          <div className="space-y-4">
            <JoinQueue onJoined={handleJoined} />
            <QueueStatus statusData={statusData} />
            <AdminPanel queueList={queueList} onRefresh={fetchQueueList} />
            <div className="rounded-2xl bg-white/95 p-5 shadow-lg">
              <h3 className="text-lg font-semibold text-brand-dark">QR Scanner</h3>
              <p className="text-slate-600">Point camera at hospital QR code (placeholder).</p>
            </div>
          </div>
        )}

        {tab === "medicine" && <MedicineSearch searchText={searchText} />}

        {tab === "navigation" && (
          <div className="rounded-2xl bg-white/95 p-5 shadow-lg">
            <h3 className="text-lg font-semibold text-brand-dark">Navigation</h3>
            <p className="text-slate-600">Location and route assistant placeholder.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
