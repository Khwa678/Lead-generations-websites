import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [notifCount, setNotifCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const updateCount = () => {
      const leads = JSON.parse(localStorage.getItem("crm_deals") || "[]");
      const hotLeads = leads.filter(l => l.status === "Hot").length;
      setNotifCount(hotLeads);
    };
    updateCount();
  }, [location]);

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Leads", path: "/leads" },
    { name: "Properties", path: "/properties" },
    { name: "AI", path: "/assistant" },
    { name: "Priority", path: "/priority" },
    { name: "Reminders", path: "/reminders" },
    { name: "Deals", path: "/deals" },
    { name: "Analytics", path: "/analytics" },
    { name: "Clients", path: "/clients" },
  ];

  return (
    <nav className="bg-[#111] text-white w-full border-b border-white/10 sticky top-0 z-50">
      {/* Top Bar: Logo and Actions */}
      <div className="px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-black tracking-tighter text-indigo-500">
          HIRESENSE AI
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/reminders" className="relative p-2 bg-gray-800 rounded-lg">
            <span>🔔</span>
            {notifCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-[10px] font-bold px-1.5 rounded-full">
                {notifCount}
              </span>
            )}
          </Link>
          <Link to="/login" className="bg-indigo-600 px-4 py-1.5 rounded-lg text-sm font-bold">
            Login
          </Link>
        </div>
      </div>

      {/* Bottom Bar: Links (This fixes the "Not Visible" issue) */}
      <div className="bg-[#1a1a1a] px-6 py-2 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-wider overflow-x-auto whitespace-nowrap scrollbar-hide">
        {navLinks.map((link) => (
          <Link 
            key={link.path}
            to={link.path} 
            className={`transition-colors hover:text-white ${
              location.pathname === link.path ? "text-indigo-400" : "text-gray-400"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;