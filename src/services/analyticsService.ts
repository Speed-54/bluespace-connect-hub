
import { apiClient } from './apiClient';

interface DashboardStats {
  totalUsers: number;
  totalProjects: number;
  activeProjects: number;
  totalRevenue: number;
  newUsersThisMonth: number;
  projectsCompletedThisMonth: number;
  averageProjectValue: number;
  userGrowthRate: number;
}

interface ProjectAnalytics {
  totalProjects: number;
  projectsByStatus: {
    active: number;
    completed: number;
    onHold: number;
    cancelled: number;
  };
  projectsByMonth: Array<{
    month: string;
    count: number;
    revenue: number;
  }>;
  averageProjectDuration: number;
  completionRate: number;
  topClients: Array<{
    id: string;
    name: string;
    projectCount: number;
    totalSpent: number;
  }>;
}

interface UserAnalytics {
  totalUsers: number;
  usersByRole: {
    clients: number;
    developers: number;
    admins: number;
  };
  usersByMonth: Array<{
    month: string;
    count: number;
  }>;
  activeUsers: number;
  userRetentionRate: number;
  topDevelopers: Array<{
    id: string;
    name: string;
    projectCount: number;
    rating: number;
    skills: string[];
  }>;
}

export class AnalyticsService {
  // GET /api/analytics/dashboard
  static async getDashboardStats(): Promise<DashboardStats> {
    try {
      const response = await apiClient.get<DashboardStats>('/analytics/dashboard');
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to fetch dashboard stats');
    } catch (error) {
      console.error('Get dashboard stats error:', error);
      throw error;
    }
  }

  // GET /api/analytics/projects
  static async getProjectAnalytics(params?: {
    startDate?: string;
    endDate?: string;
    clientId?: string;
  }): Promise<ProjectAnalytics> {
    try {
      let endpoint = '/analytics/projects';
      if (params) {
        const searchParams = new URLSearchParams();
        if (params.startDate) searchParams.append('startDate', params.startDate);
        if (params.endDate) searchParams.append('endDate', params.endDate);
        if (params.clientId) searchParams.append('clientId', params.clientId);
        
        if (searchParams.toString()) {
          endpoint += `?${searchParams.toString()}`;
        }
      }

      const response = await apiClient.get<ProjectAnalytics>(endpoint);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to fetch project analytics');
    } catch (error) {
      console.error('Get project analytics error:', error);
      throw error;
    }
  }

  // GET /api/analytics/users
  static async getUserAnalytics(params?: {
    startDate?: string;
    endDate?: string;
    role?: 'client' | 'developer' | 'admin';
  }): Promise<UserAnalytics> {
    try {
      let endpoint = '/analytics/users';
      if (params) {
        const searchParams = new URLSearchParams();
        if (params.startDate) searchParams.append('startDate', params.startDate);
        if (params.endDate) searchParams.append('endDate', params.endDate);
        if (params.role) searchParams.append('role', params.role);
        
        if (searchParams.toString()) {
          endpoint += `?${searchParams.toString()}`;
        }
      }

      const response = await apiClient.get<UserAnalytics>(endpoint);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to fetch user analytics');
    } catch (error) {
      console.error('Get user analytics error:', error);
      throw error;
    }
  }
}
