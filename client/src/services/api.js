let leads = JSON.parse(localStorage.getItem("leads")) || [];
let properties = JSON.parse(localStorage.getItem("properties")) || [];

const save = () => {
  localStorage.setItem("leads", JSON.stringify(leads));
  localStorage.setItem("properties", JSON.stringify(properties));
};

const API = {
  // LEADS
  getLeads: async () => leads,

  addLead: async (data) => {
    const newLead = {
      ...data,
      _id: Date.now(),
    };
    leads.push(newLead);
    save();
    return newLead;
  },

  deleteLead: async (id) => {
    leads = leads.filter((l) => l._id !== id);
    save();
  },

  // PROPERTIES
  getProperties: async () => properties,

  addProperty: async (data) => {
    const newProp = {
      ...data,
      _id: Date.now(),
    };
    properties.push(newProp);
    save();
    return newProp;
  },

  deleteProperty: async (id) => {
    properties = properties.filter((p) => p._id !== id);
    save();
  },
};

// 🔥 ML API CALL
export const predictLead = async (lead) => {
  try {
    const res = await fetch("http://localhost:5001/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lead),
    });

    return await res.json();
  } catch (err) {
    console.error("API ERROR:", err);
    return { score: 0, status: "Error" };
  }
};

export default API;