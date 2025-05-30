
import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '@/services/analyticsService';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['analytics', 'dashboard'],
    queryFn: () => analyticsService.getDashboardStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useProjectAnalytics = () => {
  return useQuery({
    queryKey: ['analytics', 'projects'],
    queryFn: () => analyticsService.getProjectAnalytics(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
