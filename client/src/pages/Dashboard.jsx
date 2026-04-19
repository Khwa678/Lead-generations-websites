
import { useEffect, useState } from "react";
import API from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [properties, setProperties] = useState([]);

  const projectName = localStorage.getItem("projectName");
  const projectValue = Number(localStorage.getItem("projectValue") || 0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const l = await API.getLeads();
    const p = await API.getProperties();
    setLeads(l);
    setProperties(p);
  };

  // 🔥 CONNECTED LOGIC
  const totalLeads = leads.length;
  const target = projectValue;
  const progress = target ? Math.min((totalLeads / target) * 100, 100) : 0;

  // 📊 Chart Data
  const chartData = [
    { name: "Leads", value: totalLeads },
    { name: "Target", value: target },
  ];

  const COLORS = ["#6366f1", "#22c55e"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 p-6">

      <h1 className="text-3xl font-bold text-white mb-6">
        Dashboard Overview
      </h1>

      {/* PROJECT INFO */}
      <div className="bg-white/80 p-6 rounded-2xl shadow-xl mb-6">
        <h2 className="text-gray-500">Project</h2>
        <p className="text-xl font-bold text-indigo-600">
          {projectName || "No Project"}
        </p>
        <p className="text-gray-600">
          Target Leads: {target}
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white/80 p-6 rounded-2xl shadow-xl">
          <p className="text-gray-500">Total Leads</p>
          <p className="text-3xl font-bold text-indigo-600">
            {totalLeads}
          </p>
        </div>

        <div className="bg-white/80 p-6 rounded-2xl shadow-xl">
          <p className="text-gray-500">Target</p>
          <p className="text-3xl font-bold text-green-600">
            {target}
          </p>
        </div>

        <div className="bg-white/80 p-6 rounded-2xl shadow-xl">
          <p className="text-gray-500">Progress</p>
          <p className="text-3xl font-bold text-purple-600">
            {progress.toFixed(0)}%
          </p>
        </div>

      </div>

      {/* PROGRESS BAR */}
      <div className="bg-white/80 p-4 rounded-xl mb-8">
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-indigo-500 h-4 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white/80 p-6 rounded-2xl shadow-xl">
          <h2 className="mb-4 font-semibold">Leads vs Target</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/80 p-6 rounded-2xl shadow-xl">
          <h2 className="mb-4 font-semibold">Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={chartData} dataKey="value" outerRadius={100}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;