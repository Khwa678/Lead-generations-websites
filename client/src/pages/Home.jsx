import { Link } from "react-router-dom";
import { useState } from "react"; // 🔥 IMPORTANT

function Home() {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  const handleSave = () => {
    localStorage.setItem("projectName", name);
    localStorage.setItem("projectValue", value);

    alert("Saved successfully ✅");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center p-6">

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div className="text-white space-y-6">

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Smart CRM for <br /> Modern Businesses 🚀
          </h1>

          <p className="text-lg text-white/80">
            Manage leads, properties, and track performance with a beautiful dashboard.
          </p>

          <div className="flex gap-4">
            <Link
              to="/dashboard"
              className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
            >
              Go to Dashboard
            </Link>

            <Link
              to="/leads"
              className="border border-white px-6 py-3 rounded-xl hover:bg-white/10 transition"
            >
              Manage Leads
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex justify-center">

          <div className="absolute w-72 h-72 bg-orange-400 rounded-full opacity-80 blur-2xl"></div>

          <div className="relative bg-white/90 backdrop-blur-lg p-6 rounded-2xl shadow-2xl w-[300px]">

            <h2 className="font-semibold mb-3">Project Setup</h2>

            <input
              className="w-full border p-3 rounded-lg mb-3"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="w-full border p-3 rounded-lg mb-3"
              placeholder="Enter value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />

            <button
              onClick={handleSave} // 🔥 FIXED
              className="bg-indigo-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>

          <div className="absolute bottom-0 right-0 text-4xl">
            🤖
          </div>

        </div>

      </div>
    </div>
  );
}

export default Home;