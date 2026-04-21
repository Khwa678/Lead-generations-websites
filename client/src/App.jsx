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
import DealManagement from './pages/DealManagement'; // Ne
// w // Ne
// w
import NotificationCenter from "./components/NotificationCenter";
import Login from './pages/Login'; // New
import Clients from './pages/Clients'; // New
import Analytics from './pages/Analytics'; // New
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />


        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/leads/:id" element={<LeadDetails />} />
        <Route path="/assistant" element={<Assistant />} />
        <Route path="/priority" element={<Priority />} />
        <Route path="/reminders" element={<Reminders />} />

        <Route path="/deals" element={<DealManagement />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/notification-center" element={<NotificationCenter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;