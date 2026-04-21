const handleSaveLead = (formData) => {
  // 1. Get existing deals from local storage
  const existingDeals = JSON.parse(localStorage.getItem('crm_deals') || '[]');

  // 2. Format the new lead as a "Negotiation" deal [cite: 137]
  const newDeal = {
    id: Date.now(), // Generate a unique ID
    client: formData.name,
    amount: parseInt(formData.balance) || 0, // Budget [cite: 7]
    stage: 'Negotiation', // Start in the first stage [cite: 137]
    commissionRate: 0.03, // Default commission rate 
  };

  // 3. Save back to localStorage
  localStorage.setItem('crm_deals', JSON.stringify([...existingDeals, newDeal]));

  alert("Lead saved and added to Deal Pipeline!");
};