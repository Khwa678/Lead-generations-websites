import { useState, useEffect } from "react";

function Reminders() {
  const [reminders, setReminders] = useState([]);
  const [text, setText] = useState("");

  // Load from localStorage and generate AI alerts
  useEffect(() => {
    // 1. Get manual reminders
    const savedManual = JSON.parse(localStorage.getItem("reminders")) || [];
    
    // 2. Get AI-generated follow-ups from your Leads data
    const leads = JSON.parse(localStorage.getItem("crm_leads") || "[]");
    const aiAlerts = leads
      .filter(l => l.status === "Hot")
      .map(l => ({
        id: `ai-${l._id}`,
        text: `🔥 AI Alert: High-priority follow up with ${l.name} (Score: ${l.score}%)`,
        isAI: true
      }));

    setReminders([...aiAlerts, ...savedManual]);
  }, []);

  const saveReminders = (data) => {
    // Only save the manual ones to localStorage
    const manualOnly = data.filter(r => !r.isAI);
    localStorage.setItem("reminders", JSON.stringify(manualOnly));
    setReminders(data);
  };

  const addReminder = () => {
    if (!text.trim()) return;
    const newReminder = { id: Date.now(), text, isAI: false };
    saveReminders([...reminders, newReminder]);
    setText("");
  };

  const deleteReminder = (id) => {
    const updated = reminders.filter((r) => r.id !== id);
    saveReminders(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-white">
      <h1 className="text-3xl font-bold mb-2">⏰ Action Center</h1>
      <p className="text-indigo-100 mb-8 font-medium">Manage manual tasks and AI-driven follow-ups.</p>

      {/* INPUT */}
      <div className="flex gap-3 mb-10 bg-white/10 p-4 rounded-2xl backdrop-blur-md">
        <input
          className="flex-1 p-3 rounded-xl text-black outline-none focus:ring-2 ring-green-400"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a custom task..."
        />
        <button
          onClick={addReminder}
          className="bg-green-500 px-6 py-2 rounded-xl font-bold hover:bg-green-400 transition transform active:scale-95"
        >
          Add
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {reminders.length === 0 && <p className="text-center opacity-60 italic">No pending actions</p>}

        {reminders.map((r) => (
          <div
            key={r.id}
            className={`p-5 rounded-2xl flex justify-between items-center transition-all ${
              r.isAI 
              ? "bg-white text-indigo-900 border-l-8 border-orange-500 shadow-xl" 
              : "bg-black/20 text-white backdrop-blur-sm"
            }`}
          >
            <div className="flex items-center gap-4">
              {r.isAI && <span className="text-xl">🤖</span>}
              <span className={r.isAI ? "font-bold" : "font-medium"}>{r.text}</span>
            </div>

            <button
              onClick={() => deleteReminder(r.id)}
              className={`${r.isAI ? "text-gray-400" : "text-red-300"} hover:scale-125 transition px-2`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reminders;