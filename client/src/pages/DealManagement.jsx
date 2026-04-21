import React, { useState, useEffect } from 'react';

const DealManagement = () => {
  const stages = ['Negotiation', 'Agreement', 'Closed'];
  const [deals, setDeals] = useState([]);

  // 🔄 LOAD DATA FROM STORAGE
  const loadDeals = () => {
    const savedDeals = JSON.parse(localStorage.getItem('crm_deals') || '[]');
    setDeals(savedDeals);
  };

  useEffect(() => {
    loadDeals();
  }, []);

  // 🚀 MOVE DEAL BETWEEN COLUMNS
  const moveDeal = (id, newStage) => {
    const allDeals = JSON.parse(localStorage.getItem('crm_deals') || '[]');
    const updated = allDeals.map(d => d.id === id ? { ...d, stage: newStage } : d);
    
    localStorage.setItem('crm_deals', JSON.stringify(updated));
    setDeals(updated); // Update UI immediately
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Deal Pipeline</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stages.map(stage => (
          <div key={stage} className="bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-gray-200 shadow-sm min-h-[500px]">
            <h2 className="text-xl font-bold mb-6 text-gray-700 capitalize">{stage}</h2>
            
            {deals.filter(d => d.stage === stage).map(deal => (
              <div key={deal.id} className="bg-white p-5 rounded-2xl shadow-md border border-indigo-100 mb-4 hover:shadow-lg transition">
                <h3 className="font-bold text-gray-800">{deal.client}</h3>
                <p className="text-blue-600 font-bold mt-1">₹{Number(deal.amount).toLocaleString()}</p>
                
                <div className="flex gap-2 mt-4">
                  {stage !== 'Closed' && (
                    <button 
                      onClick={() => moveDeal(deal.id, stages[stages.indexOf(stage) + 1])}
                      className="text-[10px] bg-indigo-500 text-white px-3 py-1.5 rounded-full font-bold uppercase tracking-tighter"
                    >
                      Move to {stages[stages.indexOf(stage) + 1]}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {deals.filter(d => d.stage === stage).length === 0 && (
              <p className="text-gray-400 text-sm italic text-center mt-10">No deals in {stage}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealManagement;