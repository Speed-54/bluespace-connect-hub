
const getDashboardStats = () => {
  return {
    totalUsers: 4,
    totalClients: 2,
    totalDevelopers: 1,
    totalAdmins: 1,
    totalProjects: 3,
    activeProjects: 2,
    completedProjects: 1,
    totalRevenue: 28000,
    monthlyGrowth: 12.5,
    averageProjectValue: 9333
  };
};

const getProjectAnalytics = () => {
  return {
    projectsByStatus: [
      { status: 'active', count: 2 },
      { status: 'completed', count: 1 },
      { status: 'draft', count: 0 },
      { status: 'cancelled', count: 0 }
    ],
    projectsByMonth: [
      { month: '2024-04', count: 1, totalBudget: 5000 },
      { month: '2024-05', count: 1, totalBudget: 8000 },
      { month: '2024-06', count: 1, totalBudget: 15000 }
    ],
    topClients: [
      { id: '1', name: 'John Smith', projectCount: 2, totalBudget: 20000 },
      { id: '3', name: 'Sarah Wilson', projectCount: 1, totalBudget: 8000 }
    ],
    topDevelopers: [
      { id: '2', name: 'Jane Developer', projectCount: 2, totalEarnings: 10000 }
    ]
  };
};

const getUserAnalytics = () => {
  return {
    usersByRole: [
      { role: 'client', count: 2 },
      { role: 'developer', count: 1 },
      { role: 'admin', count: 1 }
    ],
    userGrowth: [
      { month: '2024-04', newUsers: 1 },
      { month: '2024-05', newUsers: 2 },
      { month: '2024-06', newUsers: 1 }
    ]
  };
};

module.exports = {
  getDashboardStats,
  getProjectAnalytics,
  getUserAnalytics
};
