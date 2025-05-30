
import { apiService } from './api';
import { projectService } from './projectService';
import { userService } from './userService';

export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalUsers: number;
  totalClients: number;
  totalDevelopers: number;
  totalRevenue: number;
  monthlyRevenue: number;
}

export interface ProjectAnalytics {
  projectsOverTime: Array<{
    month: string;
    projects: number;
    revenue: number;
  }>;
  statusDistribution: Array<{
    status: string;
    count: number;
    percentage: number;
  }>;
  revenueByClient: Array<{
    client: string;
    revenue: number;
  }>;
}

class AnalyticsService {
  async getDashboardStats(): Promise<DashboardStats> {
    await apiService.get('/analytics/dashboard');
    
    const projects = await projectService.getAllProjects();
    const users = await userService.getAllUsers();
    
    const activeProjects = projects.filter(p => p.status === 'active').length;
    const completedProjects = projects.filter(p => p.status === 'completed').length;
    const clients = users.filter(u => u.role === 'client').length;
    const developers = users.filter(u => u.role === 'developer').length;
    
    const totalRevenue = projects
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + p.budget, 0);
    
    const currentMonth = new Date().getMonth();
    const monthlyRevenue = projects
      .filter(p => {
        const projectMonth = new Date(p.updatedAt).getMonth();
        return p.status === 'completed' && projectMonth === currentMonth;
      })
      .reduce((sum, p) => sum + p.budget, 0);

    const stats: DashboardStats = {
      totalProjects: projects.length,
      activeProjects,
      completedProjects,
      totalUsers: users.length,
      totalClients: clients,
      totalDevelopers: developers,
      totalRevenue,
      monthlyRevenue
    };

    console.log('Dashboard stats:', stats);
    return stats;
  }

  async getProjectAnalytics(): Promise<ProjectAnalytics> {
    await apiService.get('/analytics/projects');
    
    const projects = await projectService.getAllProjects();
    
    // Generate monthly data for the last 6 months
    const projectsOverTime = this.generateMonthlyData(projects);
    
    // Status distribution
    const statusCounts = projects.reduce((acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const statusDistribution = Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count,
      percentage: Math.round((count / projects.length) * 100)
    }));

    // Revenue by client
    const clientRevenue = projects.reduce((acc, project) => {
      if (project.status === 'completed') {
        acc[project.client.name] = (acc[project.client.name] || 0) + project.budget;
      }
      return acc;
    }, {} as Record<string, number>);

    const revenueByClient = Object.entries(clientRevenue)
      .map(([client, revenue]) => ({ client, revenue }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10); // Top 10 clients

    const analytics: ProjectAnalytics = {
      projectsOverTime,
      statusDistribution,
      revenueByClient
    };

    console.log('Project analytics:', analytics);
    return analytics;
  }

  private generateMonthlyData(projects: any[]) {
    const months = [];
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      
      const monthProjects = projects.filter(p => {
        const projectDate = new Date(p.createdAt);
        return projectDate.getMonth() === date.getMonth() && 
               projectDate.getFullYear() === date.getFullYear();
      });

      const monthRevenue = monthProjects
        .filter(p => p.status === 'completed')
        .reduce((sum, p) => sum + p.budget, 0);

      months.push({
        month: monthName,
        projects: monthProjects.length,
        revenue: monthRevenue
      });
    }
    
    return months;
  }
}

export const analyticsService = new AnalyticsService();
