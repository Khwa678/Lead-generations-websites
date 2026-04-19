import { useState } from "react";
import API from "../services/api";

function PropertyForm({ refreshProperties }) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);

  // handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.price) {
      alert("Title and Price are required");
      return;
    }

    try {
      setLoading(true);

      await API.post("/properties", {
        ...form,
        price: Number(form.price), // ensure number
      });

      // reset form
      setForm({
        title: "",
        price: "",
        location: "",
      });

      // refresh list
      refreshProperties && refreshProperties();
    } catch (err) {
      console.error(err);
      alert("Error adding property");
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
        name="title"
        placeholder="Property Title"
        value={form.title}
        onChange={handleChange}
      />

      <input
        name="price"
        placeholder="Price"
        type="number"
        value={form.price}
        onChange={handleChange}
      />

      <input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
      />

      <button type="submit">
        {loading ? "Adding..." : "Add Property"}
      </button>
    </form>
  );
}

export default PropertyForm;