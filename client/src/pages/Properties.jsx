import { useEffect, useState } from "react";
import API from "../services/api";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);

  const getProperties = async () => {
    setLoading(true);
    try {
      const data = await API.getProperties();
      setProperties(data);
    } catch (err) {
      console.error("Failed to fetch properties", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price) return;

    // Convert price to number before sending to API
    const propertyData = {
      ...form,
      price: parseInt(form.price.replace(/,/g, ''), 10) 
    };

    await API.addProperty(propertyData);
    setForm({ title: "", price: "", location: "" });
    getProperties();
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center font-sans">
      
      {/* Visual background decorations */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
      <div className="absolute top-10 left-10 w-64 h-64 bg-green-400 opacity-20 rounded-full blur-3xl"></div>

      <div className="relative grid lg:grid-cols-2 gap-12 items-start w-full max-w-6xl p-6 z-10">

        {/* LEFT SIDE: ADD PROPERTY FORM */}
        <div className="bg-white/90 backdrop-blur-xl p-10 rounded-[40px] shadow-2xl border border-white/40 sticky top-24">
          <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Add Property</h1>
          <p className="text-gray-500 mb-8 font-medium">Expand your inventory for AI matching</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-indigo-600 uppercase ml-1">Property Name</label>
              <input
                className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:ring-4 focus:ring-indigo-200 outline-none transition-all"
                placeholder="e.g. Skyline Apartments"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-indigo-600 uppercase ml-1">Price (₹)</label>
              <input
                type="number"
                className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:ring-4 focus:ring-indigo-200 outline-none transition-all"
                placeholder="e.g. 5000000"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-indigo-600 uppercase ml-1">Location</label>
              <input
                className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:ring-4 focus:ring-indigo-200 outline-none transition-all"
                placeholder="City or Area"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>

            <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-indigo-500/30 hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95">
              PUBLISH LISTING
            </button>
          </form>
        </div>

        {/* RIGHT SIDE: PROPERTY CARDS */}
        <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-4 scrollbar-hide">
          <h2 className="text-white text-xl font-bold mb-4 ml-2">Live Inventory ({properties.length})</h2>
          
          {loading && <p className="text-white animate-pulse">Syncing with HireSense Cloud...</p>}
          
          {properties.length === 0 && !loading && (
            <div className="bg-white/10 p-10 rounded-3xl border border-dashed border-white/30 text-center">
              <p className="text-indigo-100">No properties listed yet. Start adding your stock!</p>
            </div>
          )}

          {properties.map((p) => (
            <div
              key={p._id}
              className="group bg-white/95 backdrop-blur-md flex items-center justify-between p-5 rounded-[28px] shadow-lg border border-white/50 hover:bg-white transition-all cursor-default"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                  🏙️
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">{p.title}</h3>
                  <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider">{p.location || "Remote"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[10px] font-black text-gray-400 uppercase">Asking Price</p>
                  <p className="font-black text-green-600 text-lg">₹{Number(p.price).toLocaleString()}</p>
                </div>
                
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                  onClick={async () => {
                    await API.deleteProperty(p._id);
                    getProperties();
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Properties;