import { useState, useRef, useEffect } from "react";

function Assistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Replace with your actual key
  const API_KEY = "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";

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173", // Site URL
          "X-Title": "HireSense AI CRM"
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3-8b-instruct",
          messages: [
            { 
              role: "system", 
              content: "You are HireSense AI, a professional real estate assistant for Ayush. You help manage leads, score prospects, and provide real estate insights. Keep responses concise, professional, and action-oriented." 
            },
            { role: "user", content: userMessage }
          ],
        }),
      });

      const data = await res.json();
      let reply = "I'm having trouble connecting to the network.";

      if (data.error) {
        reply = "❌ AI Error: " + data.error.message;
      } else if (data.choices) {
        reply = data.choices[0].message.content;
      }

      setMessages(prev => [...prev, { user: userMessage, bot: reply }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { user: userMessage, bot: "❌ Connection error. Please check your API key." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] p-4 lg:p-10 flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col h-[85vh]">
        
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 tracking-tighter">
            HIRESENSE AI ASSISTANT
          </h1>
          <p className="text-slate-400 text-sm font-medium">Your 24/7 Real Estate Intelligent Partner</p>
        </div>

        {/* CHAT WINDOW */}
        <div className="flex-1 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[32px] overflow-hidden flex flex-col shadow-2xl">
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center opacity-30 text-center">
                <span className="text-6xl mb-4">🏠</span>
                <p className="max-w-xs">Ask me about market trends, lead follow-up scripts, or property descriptions.</p>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className="space-y-4">
                {/* USER BUBBLE */}
                <div className="flex justify-end">
                  <div className="bg-indigo-600 text-white px-5 py-3 rounded-2xl rounded-tr-none max-w-[85%] shadow-lg shadow-indigo-500/20">
                    <p className="text-sm font-medium">{m.user}</p>
                  </div>
                </div>

                {/* BOT BUBBLE */}
                <div className="flex justify-start">
                  <div className="bg-slate-800 text-slate-100 px-5 py-3 rounded-2xl rounded-tl-none max-w-[85%] border border-white/5">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.bot}</p>
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 px-5 py-3 rounded-2xl animate-pulse text-indigo-400 text-xs font-bold uppercase tracking-widest">
                  HireSense is thinking...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* INPUT AREA */}
          <div className="p-4 bg-slate-900/80 border-t border-white/5">
            <div className="flex gap-3 items-center">
              <input
                className="flex-1 bg-slate-800 border border-white/10 p-4 rounded-2xl outline-none text-white focus:ring-2 ring-indigo-500 transition-all text-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Message your AI assistant..."
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className={`bg-indigo-500 hover:bg-indigo-400 text-white h-12 w-12 rounded-2xl flex items-center justify-center transition-all shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : 'active:scale-90'}`}
              >
                {loading ? "..." : "➔"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Assistant;