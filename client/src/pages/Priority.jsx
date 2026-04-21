import { useEffect, useState } from "react";
import API from "../services/api";

function Priority() {
  const [leads, setLeads] = useState([]);
  const [properties, setProperties] = useState([]); // New: Store properties
  const [loading, setLoading] = useState(true);

  const getPriorityData = async () => {
    try {
      // Fetch both leads and properties simultaneously
      const [leadsData, propsData] = await Promise.all([
        API.getLeads(),
        API.getProperties()
      ]);
      
      const sortedLeads = [...leadsData].sort((a, b) => (b.score || 0) - (a.score || 0));
      setLeads(sortedLeads);
      setProperties(propsData);
    } catch (err) {
      console.error("Failed to sync Priority data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPriorityData();
  }, []);

  // New: Logic to find the best property within the lead's budget
  const findMatch = (budget) => {
    const affordable = properties
      .filter(p => p.price <= budget)
      .sort((a, b) => b.price - a.price); // Closest to their max budget
    return affordable.length > 0 ? affordable[0] : null;
  };

  const getStatusColor = (status) => {
    const colors = {
      Hot: "bg-orange-500 text-white shadow-lg shadow-orange-500/30",
      Warm: "bg-yellow-400 text-yellow-900",
      Cold: "bg-blue-100 text-blue-600",
    };
    return colors[status] || "bg-gray-100 text-gray-600";
  };

  return (
    <div className="min-h-screen bg-[#0f172a] p-8 text-white font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black tracking-tight mb-2 flex items-center gap-3">
            <span className="text-orange-500 animate-pulse">🔥</span> 
            Priority Pipeline
          </h1>
          <p className="text-slate-400 font-medium">AI-sorted prospects matched with live inventory.</p>
        </header>

        {loading ? (
          <div className="flex flex-col items-center py-20 opacity-50">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p>Scanning Matches...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {leads.map((l) => {
              const matchedProp = findMatch(l.balance); // Find matching property
              
              return (
                <div key={l._id} className="group bg-slate-800/40 backdrop-blur-xl p-7 rounded-[40px] border border-slate-700 hover:border-indigo-500/50 transition-all">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    
                    {/* LEAD INFO */}
                    <div className="flex items-center gap-5">
                      <div className="relative flex-shrink-0">
                        <svg className="w-16 h-16 transform -rotate-90">
                          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-700" />
                          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={175.9} strokeDashoffset={175.9 - (175.9 * (l.score || 0)) / 100} className="text-indigo-500" />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-sm font-black">{l.score || 0}%</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{l.name}</h3>
                        <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest">Budget: ₹{Number(l.balance || 0).toLocaleString()}</p>
                      </div>
                    </div>

                    {/* AI MATCHED PROPERTY TAG */}
                    {matchedProp && (
                      <div className="bg-indigo-500/10 border border-indigo-500/30 px-4 py-2 rounded-2xl flex items-center gap-3">
                        <span className="text-lg">🏙️</span>
                        <div>
                          <p className="text-[10px] font-black text-indigo-300 uppercase">Top Match</p>
                          <p className="text-sm font-bold text-white">{matchedProp.title}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3 w-full md:w-auto">
                      <span className={`px-4 py-1.5 rounded-2xl text-xs font-black uppercase ${getStatusColor(l.status)}`}>
                        {l.status || "Nurture"}
                      </span>
                      <button onClick={() => window.location.href = `mailto:${l.email}`} className="bg-white text-black px-6 py-2 rounded-xl text-sm font-bold hover:scale-105 transition-all">
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Priority;
