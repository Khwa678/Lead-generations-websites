import { useEffect, useState } from "react";

function Priority() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("leads")) || [];

    // 🔥 SAFE SORT (handles undefined score)
    const sorted = [...data].sort((a, b) => {
      const scoreA = a.score || 0;
      const scoreB = b.score || 0;
      return scoreB - scoreA;
    });

    setLeads(sorted);
  }, []);

  const getStatusColor = (status) => {
    if (status === "Hot") return "bg-green-100 text-green-600";
    if (status === "Warm") return "bg-yellow-100 text-yellow-600";
    if (status === "Cold") return "bg-red-100 text-red-600";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-white">

      <h1 className="text-3xl font-bold mb-6">🔥 Priority Leads</h1>

      {leads.length === 0 && (
        <p>No leads available</p>
      )}

      <div className="space-y-4">
        {leads.map((l) => (
          <div
            key={l._id}
            className="bg-white/90 text-black p-5 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{l.name}</h3>
              <p className="text-sm">{l.email}</p>

              <p className="mt-2">
                Score:{" "}
                <span className="font-semibold">
                  {l.score ? `${l.score}%` : "0%"}
                </span>
              </p>
            </div>

            <div className="text-right">
              <span
                className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                  l.status
                )}`}
              >
                {l.status || "Unknown"}
              </span>

              <p className="text-xs mt-2 text-gray-500">
                {l.status === "Hot"
                  ? "🔥 Call immediately"
                  : l.status === "Warm"
                  ? "📧 Follow up"
                  : "❄️ Nurture"}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Priority;