
import { apiClient } from './apiClient';
import { User } from '@/hooks/useAuth';

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role: 'client' | 'developer' | 'admin';
  company?: string;
  skills?: string[];
  bio?: string;
}

interface UpdateUserRequest {
  name?: string;
  email?: string;
  company?: string;
  skills?: string[];
  bio?: string;
  isActive?: boolean;
}

export class UserService {
  // GET /api/users
  static async getAllUsers(): Promise<User[]> {
    try {
      const response = await apiClient.get<User[]>('/users');
      return response.data || [];
    } catch (error) {
      console.error('Get users error:', error);
      throw error;
    }
  }

  // GET /api/users/:id
  static async getUserById(id: string): Promise<User> {
    try {
      const response = await apiClient.get<User>(`/users/${id}`);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'User not found');
    } catch (error) {
      console.error('Get user error:', error);
      throw error;
    }
  }

  // POST /api/users
  static async createUser(userData: CreateUserRequest): Promise<User> {
    try {
      const response = await apiClient.post<User>('/users', userData);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'User creation failed');
    } catch (error) {
      console.error('Create user error:', error);
      throw error;
    }
  }

  // PUT /api/users/:id
  static async updateUser(id: string, updateData: UpdateUserRequest): Promise<User> {
    try {
      const response = await apiClient.put<User>(`/users/${id}`, updateData);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'User update failed');
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  }

  // DELETE /api/users/:id
  static async deleteUser(id: string): Promise<void> {
    try {
      const response = await apiClient.delete(`/users/${id}`);
      if (!response.success) {
        throw new Error(response.message || 'User deletion failed');
      }
    } catch (error) {
      console.error('Delete user error:', error);
      throw error;
    }
  }

  // GET /api/users/role/:role
  static async getUsersByRole(role: 'client' | 'developer' | 'admin'): Promise<User[]> {
    try {
      const response = await apiClient.get<User[]>(`/users/role/${role}`);
      return response.data || [];
    } catch (error) {
      console.error('Get users by role error:', error);
      throw error;
    }
  }
}
