
import { apiService } from './api';

export interface Notification {
  id: string;
  type: 'project' | 'message' | 'deadline' | 'payment' | 'system';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  userId: string;
  metadata?: Record<string, any>;
}

class NotificationService {
  private storageKey = 'notifications';

  private getNotifications(): Notification[] {
    try {
      const stored = localStorage.getItem(`bluespace_${this.storageKey}`);
      return stored ? JSON.parse(stored) : this.getDefaultNotifications();
    } catch {
      return this.getDefaultNotifications();
    }
  }

  private saveNotifications(notifications: Notification[]): void {
    localStorage.setItem(`bluespace_${this.storageKey}`, JSON.stringify(notifications));
  }

  private getDefaultNotifications(): Notification[] {
    return [
      {
        id: '1',
        type: 'project',
        title: 'New Project Assignment',
        description: 'You have been assigned to the E-commerce Platform project',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        read: false,
        priority: 'high',
        userId: '2',
        metadata: { projectId: '1' }
      },
      {
        id: '2',
        type: 'message',
        title: 'Client Message',
        description: 'Sarah Johnson sent you a message about the API integration',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
        read: false,
        priority: 'medium',
        userId: '2',
        metadata: { clientId: '3' }
      },
      {
        id: '3',
        type: 'deadline',
        title: 'Deadline Reminder',
        description: 'Mobile App MVP is due in 2 days',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        read: true,
        priority: 'high',
        userId: '2',
        metadata: { projectId: '2' }
      },
      {
        id: '4',
        type: 'payment',
        title: 'Payment Received',
        description: 'Payment of $2,500 has been processed for Project Alpha',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        read: true,
        priority: 'low',
        userId: '2',
        metadata: { amount: 2500, projectId: '3' }
      }
    ];
  }

  async getNotificationsForUser(userId: string): Promise<Notification[]> {
    await apiService.get(`/notifications/user/${userId}`);
    const notifications = this.getNotifications();
    const userNotifications = notifications.filter(n => n.userId === userId);
    console.log(`Retrieved ${userNotifications.length} notifications for user ${userId}`);
    return userNotifications;
  }

  async markAsRead(notificationId: string): Promise<boolean> {
    const notifications = this.getNotifications();
    const notification = notifications.find(n => n.id === notificationId);
    
    if (!notification) {
      return false;
    }

    notification.read = true;
    this.saveNotifications(notifications);
    
    await apiService.put(`/notifications/${notificationId}/read`, { read: true });
    console.log('Marked notification as read:', notificationId);
    return true;
  }

  async markAllAsRead(userId: string): Promise<boolean> {
    const notifications = this.getNotifications();
    const userNotifications = notifications.filter(n => n.userId === userId);
    
    userNotifications.forEach(notification => {
      notification.read = true;
    });
    
    this.saveNotifications(notifications);
    
    await apiService.put(`/notifications/user/${userId}/read-all`, {});
    console.log(`Marked all notifications as read for user ${userId}`);
    return true;
  }

  async createNotification(notification: Omit<Notification, 'id' | 'timestamp'>): Promise<Notification> {
    const notifications = this.getNotifications();
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    
    notifications.push(newNotification);
    this.saveNotifications(notifications);
    
    await apiService.post('/notifications', newNotification);
    console.log('Created notification:', newNotification);
    return newNotification;
  }

  async deleteNotification(notificationId: string): Promise<boolean> {
    const notifications = this.getNotifications();
    const filteredNotifications = notifications.filter(n => n.id !== notificationId);
    
    if (filteredNotifications.length === notifications.length) {
      return false;
    }
    
    this.saveNotifications(filteredNotifications);
    await apiService.delete(`/notifications/${notificationId}`);
    console.log('Deleted notification:', notificationId);
    return true;
  }

  async getUnreadCount(userId: string): Promise<number> {
    const notifications = await this.getNotificationsForUser(userId);
    return notifications.filter(n => !n.read).length;
  }
}

export const notificationService = new NotificationService();
