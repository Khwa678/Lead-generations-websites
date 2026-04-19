import { useState } from "react";
import API from "../services/api";

function LeadForm({ refreshLeads }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  // handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone) {
      alert("Name and Phone are required");
      return;
    }

    try {
      setLoading(true);
      await API.post("/leads", form);

      // reset form
      setForm({
        name: "",
        phone: "",
        email: "",
      });

      // refresh parent list
      refreshLeads && refreshLeads();
    } catch (err) {
      console.error(err);
      alert("Error adding lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
        flexWrap: "wrap",
      }}
    >
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <button type="submit">
        {loading ? "Adding..." : "Add Lead"}
      </button>
    </form>
  );
}

export default LeadForm;