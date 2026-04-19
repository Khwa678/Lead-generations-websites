import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Properties from "./pages/Properties";
import Home from "./pages/Home";
import LeadDetails from "./pages/LeadDetails";
import Assistant from "./pages/Assistant";
import Priority from "./pages/Priority";
import Reminders from "./pages/Reminders";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/leads/:id" element={<LeadDetails />} />
        <Route path="/assistant" element={<Assistant />} />
        <Route path="/priority" element={<Priority />} />
        <Route path="/reminders" element={<Reminders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;