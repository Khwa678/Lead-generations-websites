import React, { useState } from 'react';

const Clients = () => {
  const [clients] = useState(() => {
    const saved = localStorage.getItem('crm_clients');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "Rahul Verma", type: "Buyer", preference: "3BHK, Budget 2Cr", history: ["Visited Property #101", "Called on May 12"] },
      { id: 2, name: "Priya Singh", type: "Seller", preference: "Duplex in Rohini", history: ["Listed Property #202"] }
    ];
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Client Management</h1>
      <div className="grid grid-cols-1 gap-4">
        {clients.map(client => (
          <div key={client.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">{client.name}</h2>
                <span className="text-xs font-bold uppercase px-2 py-1 bg-blue-100 text-blue-700 rounded">
                  {client.type}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 font-medium">Preferences:</p>
                <p className="text-sm text-gray-800">{client.preference}</p>
              </div>
            </div>
            <div className="mt-4 border-t pt-4">
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">Interaction History</p>
              <ul className="list-disc ml-5 text-sm text-gray-600">
                {client.history.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clients;