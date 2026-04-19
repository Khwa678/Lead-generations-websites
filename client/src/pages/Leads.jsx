import { useEffect, useState } from "react";
import API, { predictLead } from "../services/api";

function Leads() {
  const [leads, setLeads] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    balance: "",
    job: "",
  });

  const getLeads = async () => {
    const data = await API.getLeads();
    setLeads(data);
  };

  useEffect(() => {
    getLeads();
  }, []);

  // 🚀 SUBMIT WITH ML
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await predictLead({
        age: Number(form.age) || 30,
        balance: Number(form.balance) || 1000,
        campaign: 1,
        pdays: -1,
        previous: 0,
        job: form.job || "admin.",
        housing: "yes",
      });

      // SAVE WITH ML DATA
      await API.addLead({
        ...form,
        score: result.score,
        status: result.status,
      });

      // RESET FORM
      setForm({
        name: "",
        email: "",
        phone: "",
        age: "",
        balance: "",
        job: "",
      });

      getLeads();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  // 🎨 COLOR BASED ON STATUS
  const getStatusColor = (status) => {
    if (status === "Hot") return "bg-green-100 text-green-600";
    if (status === "Warm") return "bg-yellow-100 text-yellow-600";
    if (status === "Cold") return "bg-red-100 text-red-600";
    return "bg-gray-100 text-gray-600";
  };

  // 🤖 AI Suggestion
  const getSuggestion = (status) => {
    if (status === "Hot") return "🔥 Call immediately";
    if (status === "Warm") return "📧 Send follow-up email";
    return "❄️ Nurture with ads/content";
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center p-6">

      <div className="grid lg:grid-cols-2 gap-12 w-full max-w-6xl">

        {/* LEFT FORM */}
        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl">

          <h1 className="text-2xl font-bold mb-2 text-gray-800">
            Add New Lead
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              className="input"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="input"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              className="input"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <input
              className="input"
              placeholder="Age"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
            />

            <input
              className="input"
              placeholder="Balance"
              value={form.balance}
              onChange={(e) => setForm({ ...form, balance: e.target.value })}
            />

            <select
              className="input"
              value={form.job}
              onChange={(e) => setForm({ ...form, job: e.target.value })}
            >
              <option value="">Select Job</option>
              <option value="admin.">Admin</option>
              <option value="technician">Technician</option>
              <option value="services">Services</option>
              <option value="management">Management</option>
              <option value="student">Student</option>
            </select>

            <button className="w-full bg-indigo-500 text-white py-3 rounded-xl hover:scale-105 transition">
              Predict & Save Lead 🚀
            </button>
          </form>
        </div>

        {/* RIGHT LIST */}
        <div className="space-y-4">

          {leads.length === 0 && (
            <p className="text-white">No leads yet</p>
          )}

          {leads.map((l) => (
            <div
              key={l._id}
              className="bg-white/90 p-5 rounded-2xl shadow-xl flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-gray-800">{l.name}</h3>
                <p className="text-sm text-gray-500">{l.email}</p>

                <p className="text-sm mt-2">
                  Score: <span className="font-bold">{l.score}%</span>
                </p>

                <p className="text-sm">{getSuggestion(l.status)}</p>
              </div>

              <div className="text-right">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                    l.status
                  )}`}
                >
                  {l.status}
                </span>

                <button
                  className="block mt-3 text-red-500"
                  onClick={async () => {
                    await API.deleteLead(l._id);
                    getLeads();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* 🔥 Tailwind input shortcut */}
      <style>
        {`
          .input {
            width: 100%;
            border: 1px solid #ddd;
            padding: 10px;
            border-radius: 12px;
            outline: none;
          }
        `}
      </style>
    </div>
  );
}

export default Leads;