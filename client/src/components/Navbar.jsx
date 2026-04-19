import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={{
  display: "flex",
  gap: "20px",
  padding: "10px",
  background: "#222",
}}>
  <Link style={{ color: "white" }} to="/">Dashboard</Link>
  <Link style={{ color: "white" }} to="/leads">Leads</Link>
  <Link style={{ color: "white" }} to="/properties">Properties</Link>
  <Link style={{ color: "white" }} to="/assistant">AI</Link>
  <Link style={{ color: "white" }} to="/priority">Priority</Link>
  <Link style={{ color: "white" }} to="/reminders">Reminders</Link>
</div>
  );
}

export default Navbar;