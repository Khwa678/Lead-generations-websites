import { useEffect, useState } from "react";
import API, { predictLead } from "../services/api";
// Import the CRM Service to enable cross-page dynamic data
import { crmService } from '../utils/crmService';

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. GET ML PREDICTION
      const result = await predictLead({
        age: Number(form.age) || 30,
        balance: Number(form.balance) || 1000,
        campaign: 1,
        pdays: -1,
        previous: 0,
        job: form.job || "admin.",
        housing: "yes",
      });

      // 2. SAVE TO BACKEND API (Standard Lead Storage)
      await API.addLead({
        ...form,
        score: result.score,
        status: result.status,
      });

      // 3. DYNAMIC SYNC: Capture as a New Deal in the Pipeline
      // This ensures the lead appears on the /deals page automatically
      crmService.captureLead({
        name: form.name,
        budget: form.balance,
        phone: form.phone
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
      alert(`Lead Captured! AI Status: ${result.status}`);
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const getStatusColor = (status) => {
    if (status === "Hot") return "bg-green-100 text-green-600";
    if (status === "Warm") return "bg-yellow-100 text-yellow-600";
    if (status === "Cold") return "bg-red-100 text-red-600";
    return "bg-gray-100 text-gray-600";
  };

  const getSuggestion = (status) => {
    if (status === "Hot") return "🔥 Call immediately";
    if (status === "Warm") return "📧 Send follow-up email";
    return "❄️ Nurture with ads/content";
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center p-6 font-sans">
      <div className="grid lg:grid-cols-2 gap-12 w-full max-w-6xl">
        
        {/* LEFT FORM */}
        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl">
          <h1 className="text-2xl font-bold mb-2 text-gray-800">Add New Lead</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="input" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input className="input" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input className="input" placeholder="Age" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
            <input className="input" placeholder="Balance" value={form.balance} onChange={(e) => setForm({ ...form, balance: e.target.value })} />
            
            <select className="input" value={form.job} onChange={(e) => setForm({ ...form, job: e.target.value })}>
              <option value="">Select Job</option>
              <option value="admin.">Admin</option>
              <option value="technician">Technician</option>
              <option value="services">Services</option>
              <option value="management">Management</option>
              <option value="student">Student</option>
            </select>

            <button className="w-full bg-indigo-500 text-white py-3 rounded-xl hover:scale-105 transition font-bold shadow-lg">
              Predict & Save Lead 🚀
            </button>
          </form>
        </div>

        {/* RIGHT LIST */}
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {leads.length === 0 && (
            <p className="text-white italic">No leads captured yet.</p>
          )}
          {leads.map((l) => (
            <div key={l._id} className="bg-white/90 p-5 rounded-2xl shadow-xl flex justify-between items-center hover:bg-white transition-colors">
              <div>
                <h3 className="font-bold text-gray-800">{l.name}</h3>
                <p className="text-sm text-gray-500">{l.email}</p>
                <p className="text-sm mt-2 text-indigo-600">Score: <span className="font-bold">{l.score}%</span></p>
                <p className="text-sm italic text-gray-400">{getSuggestion(l.status)}</p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(l.status)}`}>
                  {l.status}
                </span>
                <button className="block mt-4 text-xs font-bold text-red-400 hover:text-red-600 transition" onClick={async () => { await API.deleteLead(l._id); getLeads(); }}>
                  Delete Lead
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          .input {
            width: 100%;
            border: 1px solid #e2e8f0;
            padding: 12px;
            border-radius: 12px;
            outline: none;
            background: white;
            transition: border-color 0.2s;
          }
          .input:focus {
            border-color: #6366f1;
          }
        `}
      </style>
    </div>
  );
}

export default Leads;