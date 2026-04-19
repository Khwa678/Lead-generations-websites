import { useState } from "react";

function Assistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const API_KEY = "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"; // 🔥 paste here

  const handleSend = async () => {
    if (!input) return;

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    "HTTP-Referer": "http://localhost:5173",
    "X-Title": "CRM App"
  },
  body: JSON.stringify({
    model: "meta-llama/llama-3-8b-instruct",
    messages: [
      { role: "user", content: input }
    ],
  }),
});

const data = await res.json();
console.log(data);

let reply = "No response from AI";

if (data.error) {
  reply = "❌ " + data.error.message;
} else if (data.choices) {
  reply = data.choices[0].message.content;
}

setMessages([
  ...messages,
  { user: input, bot: reply },
]);
setInput("");
}
      catch (err) {
      console.error(err);
      setMessages([
        ...messages,
        { user: input, bot: "❌ Error connecting to AI" },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-10 text-black">

      <h1 className="text-3xl font-bold mb-6">🤖 AI Assistant</h1>

      {/* CHAT */}
      <div className="bg-black/10 p-5 rounded-xl h-[400px] overflow-y-auto space-y-3">
        {messages.length === 0 && <p>Ask something about your leads...</p>}

        {messages.map((m, i) => (
          <div key={i}>
            <p className="text-black-200">👤 {m.user}</p>
            <p className="text-black-200">🤖 {m.bot}</p>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="mt-5 flex gap-2">
        <input
          className="flex-1 p-3 rounded-xl text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about leads..."
        />

        <button
          onClick={handleSend}
          className="bg-blue/20 px-4 py-2 rounded-xl hover:scale-105 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Assistant;