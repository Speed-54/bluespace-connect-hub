
import { useQuery } from '@tanstack/react-query';
import { AnalyticsService } from '@/services/analyticsService';

// Dashboard analytics
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['analytics', 'dashboard'],
    queryFn: AnalyticsService.getDashboardStats,
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
};

// Project analytics
export const useProjectAnalytics = (params?: {
  startDate?: string;
  endDate?: string;
  clientId?: string;
}) => {
  return useQuery({
    queryKey: ['analytics', 'projects', params],
    queryFn: () => AnalyticsService.getProjectAnalytics(params),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// User analytics
export const useUserAnalytics = (params?: {
  startDate?: string;
  endDate?: string;
  role?: 'client' | 'developer' | 'admin';
}) => {
  return useQuery({
    queryKey: ['analytics', 'users', params],
    queryFn: () => AnalyticsService.getUserAnalytics(params),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// **BACKEND CONNECTION POINT**
// These hooks will automatically connect to your backend once the services are properly configured
// The mock data should be replaced with actual API responses from your server endpoints

// Specialized analytics hooks for different user roles
export const useClientAnalytics = (clientId?: string) => {
  return useProjectAnalytics(clientId ? { clientId } : undefined);
};

export const useDeveloperAnalytics = (startDate?: string, endDate?: string) => {
  return useUserAnalytics({ 
    role: 'developer',
    startDate,
    endDate 
  });
};
