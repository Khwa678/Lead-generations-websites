export const crmService = {
  // Fetch all deals from storage
  getDeals: () => {
    try {
      const savedDeals = localStorage.getItem('crm_deals');
      return savedDeals ? JSON.parse(savedDeals) : [];
    } catch (e) {
      console.error("Error parsing deals", e);
      return [];
    }
  },

  // Add a new lead to the Deal Pipeline automatically
  captureLead: (leadData) => {
    const deals = crmService.getDeals();
    const newDeal = {
      id: Date.now(),
      client: leadData.name || 'Unknown Lead',
      amount: parseInt(leadData.budget) || 0,
      stage: 'Negotiation', // Default starting stage
      commissionRate: 0.03,
      createdAt: new Date().toISOString()
    };
    const updatedDeals = [...deals, newDeal];
    localStorage.setItem('crm_deals', JSON.stringify(updatedDeals));
    return updatedDeals;
  },

  // Calculate stats for the Analytics page dynamically
  getAnalytics: () => {
    const deals = crmService.getDeals();
    const closed = deals.filter(d => d.stage === 'Closed');
    const revenue = closed.reduce((sum, d) => sum + d.amount, 0);
    return {
      revenue,
      dealCount: deals.length,
      closedCount: closed.length,
      commission: closed.reduce((sum, d) => sum + (d.amount * d.commissionRate), 0)
    };
  }
};