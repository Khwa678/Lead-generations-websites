import React from 'react';

const NotificationCenter = () => {
  const notifications = [
    { id: 1, text: "Follow up with Ankit Sharma", time: "2 hours ago", type: "reminder" },
    { id: 2, text: "New Lead captured from Website", time: "5 hours ago", type: "lead" },
    { id: 3, text: "Deal closed by Agent Sunita", time: "1 day ago", type: "deal" }
  ];

  return (
    <div className="bg-white border rounded-lg shadow-lg p-4 w-80">
      <h3 className="font-bold border-b pb-2 mb-3">Recent Alerts</h3>
      <div className="space-y-3">
        {notifications.map(n => (
          <div key={n.id} className="text-sm">
            <p className="text-gray-800 font-medium">{n.text}</p>
            <p className="text-[10px] text-gray-400 uppercase">{n.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationCenter;