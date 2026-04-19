import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function LeadDetails() {
  const { id } = useParams();
  const [lead, setLead] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("leads")) || [];
    const found = data.find((l) => l._id.toString() === id);
    setLead(found);
  }, [id]);

  if (!lead) return <div>Loading...</div>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">{lead.name}</h1>
      <p>Email: {lead.email}</p>
      <p>Phone: {lead.phone}</p>
      <p>Score: {lead.score}%</p>
      <p>Status: {lead.status}</p>

      <p className="mt-4">
        🤖 Suggestion:{" "}
        {lead.status === "Hot"
          ? "Call immediately"
          : lead.status === "Warm"
          ? "Send follow-up email"
          : "Nurture via ads"}
      </p>
    </div>
  );
}

export default LeadDetails;