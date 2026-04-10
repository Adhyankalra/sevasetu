import { useState } from "react";
import { api } from "../api";

export default function MedicineSearch() {
  const [name, setName] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const search = async () => {
    setError("");
    try {
      const { data } = await api.get(`/api/medicine/search?name=${encodeURIComponent(name)}`);
      setResults(data);
    } catch (err) {
      setError(err.response?.data?.message || "Search failed");
    }
  };

  return (
    <div className="rounded-2xl bg-white/95 p-5 shadow-lg">
      <h3 className="text-lg font-semibold text-brand-dark">Medicine Finder</h3>
      <div className="mt-4 flex gap-2">
        <input
          className="flex-1 rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-brand-base"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter medicine name"
        />
        <button className="rounded-xl bg-brand-base px-4 py-2 font-semibold text-white hover:bg-brand-dark" onClick={search}>
          Search
        </button>
      </div>
      <ul className="mt-4 space-y-2">
        {results.map((item) => (
          <li key={item.name} className="rounded-xl border border-slate-200 p-3">
            <p className="font-semibold text-slate-800">{item.name}</p>
            <p className="text-sm text-slate-600">Distance: {item.distance}</p>
            <a className="mt-1 inline-block text-sm text-brand-base underline" href={item.mapsLink} target="_blank" rel="noreferrer">
              Open in Maps
            </a>
          </li>
        ))}
      </ul>
      {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}
    </div>
  );
}
