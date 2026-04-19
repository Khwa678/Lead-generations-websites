import { useState, useEffect } from "react";

function Reminders() {
  const [reminders, setReminders] = useState([]);
  const [text, setText] = useState("");

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("reminders")) || [];
    setReminders(saved);
  }, []);

  // Save to localStorage
  const saveReminders = (data) => {
    setReminders(data);
    localStorage.setItem("reminders", JSON.stringify(data));
  };

  // Add reminder
  const addReminder = () => {
    if (!text.trim()) return;

    const newReminder = {
      id: Date.now(),
      text,
    };

    saveReminders([...reminders, newReminder]);
    setText("");
  };

  // Delete reminder
  const deleteReminder = (id) => {
    const updated = reminders.filter((r) => r.id !== id);
    saveReminders(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-white">

      <h1 className="text-3xl font-bold mb-6">⏰ Reminders</h1>

      {/* INPUT */}
      <div className="flex gap-3 mb-6">
        <input
          className="flex-1 p-3 rounded-xl text-black"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add reminder..."
        />

        <button
          onClick={addReminder}
          className="bg-green-500 px-4 py-2 rounded-xl hover:scale-105 transition"
        >
          Add
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {reminders.length === 0 && <p>No reminders yet</p>}

        {reminders.map((r) => (
          <div
            key={r.id}
            className="bg-black/20 p-4 rounded-xl flex justify-between items-center"
          >
            <span>{r.text}</span>

            <button
              onClick={() => deleteReminder(r.id)}
              className="text-red-300 hover:text-black-500"
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