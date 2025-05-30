
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationService, Notification } from '@/services/notificationService';
import { toast } from '@/hooks/use-toast';

export const useNotifications = (userId: string) => {
  return useQuery({
    queryKey: ['notifications', userId],
    queryFn: () => notificationService.getNotificationsForUser(userId),
    enabled: !!userId,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useUnreadCount = (userId: string) => {
  return useQuery({
    queryKey: ['notifications', 'unread', userId],
    queryFn: () => notificationService.getUnreadCount(userId),
    enabled: !!userId,
    refetchInterval: 30000,
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (notificationId: string) => 
      notificationService.markAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userId: string) => 
      notificationService.markAllAsRead(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

export const useCreateNotification = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (notification: Omit<Notification, 'id' | 'timestamp'>) =>
      notificationService.createNotification(notification),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};
