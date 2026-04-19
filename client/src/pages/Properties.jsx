import { useEffect, useState } from "react";
import API from "../services/api";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
  });

  const getProperties = async () => {
    const data = await API.getProperties();
    setProperties(data);
  };

  useEffect(() => {
    getProperties();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) return;

    await API.addProperty(form);
    setForm({ title: "", price: "", location: "" });
    getProperties();
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center">

      {/* 🌊 Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent"></div>

      {/* 🔵 Glow Shapes */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-green-400 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-400 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 left-0 w-80 h-80 border border-white/20 rounded-full"></div>

      {/* MAIN */}
      <div className="relative grid lg:grid-cols-2 gap-12 items-center w-full max-w-6xl p-6">

        {/* LEFT FORM */}
        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/30">

          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Add Property
          </h1>

          <p className="text-gray-500 mb-6">
            Manage your real estate listings
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Property Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <input
              className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />

            <input
              className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />

            <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition">
              Add Property
            </button>

          </form>
        </div>

        {/* RIGHT PROPERTY CARDS */}
        <div className="space-y-6 flex flex-col items-start">

          {properties.length === 0 && (
            <div className="text-white">Add properties to see cards</div>
          )}

          {properties.map((p) => (
            <div
              key={p._id}
              className="bg-white/80 backdrop-blur-md flex items-center justify-between p-4 rounded-xl shadow-xl w-[360px] hover:scale-105 transition"
            >
              {/* LEFT */}
              <div className="flex items-center gap-3">

                {/* Icon Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white flex items-center justify-center font-bold">
                  🏠
                </div>

                {/* Info */}
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {p.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {p.location || "No location"}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-3">

                <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                  ₹{p.price || "0"}
                </span>

                <button
                  className="text-red-500 font-bold"
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