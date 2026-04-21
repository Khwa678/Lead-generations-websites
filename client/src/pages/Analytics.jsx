import React, { useState, useEffect } from 'react';

const Analytics = () => {
  const [stats, setStats] = useState({ revenue: 0, commission: 0, pipelineCount: 0 });

  useEffect(() => {
    const deals = JSON.parse(localStorage.getItem('crm_deals') || '[]');
    
    // Calculate values based on real data
    const closedDeals = deals.filter(d => d.stage === 'Closed');
    const totalRev = closedDeals.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
    
    // Commission is 5% of closed revenue
    const totalComm = totalRev * 0.05;

    setStats({
      revenue: totalRev,
      commission: totalComm,
      pipelineCount: deals.length
    });
  }, []);

  return (
    <div className="p-10 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-10 text-gray-800">Sales Analytics</h1>
      
      <div className="space-y-6 max-w-5xl">
        <div className="bg-white p-8 rounded-[40px] shadow-xl border-l-[12px] border-green-500 flex justify-between items-center">
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Revenue</p>
            <p className="text-5xl font-black text-gray-900 mt-2">₹{stats.revenue.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] shadow-xl border-l-[12px] border-blue-500 flex justify-between items-center">
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Commissions (5%)</p>
            <p className="text-5xl font-black text-gray-900 mt-2">₹{stats.commission.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] shadow-xl border-l-[12px] border-purple-500 flex justify-between items-center">
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Pipeline</p>
            <p className="text-5xl font-black text-gray-900 mt-2">{stats.pipelineCount} Deals</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;