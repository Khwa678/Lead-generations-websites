// Centralized logic to manage dynamic data across the app
export const crmService = {
  // Get all data
  getDeals: () => JSON.parse(localStorage.getItem('crm_deals') || '[]'),
  getLeads: () => JSON.parse(localStorage.getItem('crm_leads') || '[]'),

  // Dynamic Action: Save Lead AND create a Deal automatically
  captureLead: (leadData) => {
    const leads = crmService.getLeads();
    const deals = crmService.getDeals();

    const newId = Date.now();
    
    // 1. Save to Leads
    const newLead = { ...leadData, id: newId, status: 'New' };
    localStorage.setItem('crm_leads', JSON.stringify([...leads, newLead]));

    // 2. Automatically Create a Deal in "Negotiation" stage
    const newDeal = {
      id: newId,
      client: leadData.name,
      amount: parseInt(leadData.budget) || 0,
      stage: 'Negotiation',
      commissionRate: 0.03
    };
    localStorage.setItem('crm_deals', JSON.stringify([...deals, newDeal]));
    
    return newId;
  },

  // Dynamic Action: Calculate Revenue for Analytics
  getAnalytics: () => {
    const deals = crmService.getDeals();
    const closedDeals = deals.filter(d => d.stage === 'Closed');
    const totalRevenue = closedDeals.reduce((sum, d) => sum + d.amount, 0);
    const totalCommission = closedDeals.reduce((sum, d) => sum + (d.amount * d.commissionRate), 0);
    
    return {
      revenue: totalRevenue,
      commission: totalCommission,
      dealCount: closedDeals.length,
      conversionRate: deals.length > 0 ? ((closedDeals.length / deals.length) * 100).toFixed(1) : 0
    };
  }
};