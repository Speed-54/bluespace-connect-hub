
import { apiClient } from './apiClient';
import { User } from '@/hooks/useAuth';

interface LoginRequest {
  email: string;
  password: string;
  role: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: 'client' | 'developer' | 'admin';
  company?: string;
  skills?: string[];
  bio?: string;
}

interface RegisterResponse {
  user: User;
  token: string;
}

export class AuthService {
  // POST /api/auth/login
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
      
      if (response.success && response.data) {
        // Store token in API client
        apiClient.setToken(response.data.token);
        return response.data;
      }
      
      throw new Error(response.message || 'Login failed');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // POST /api/auth/register
  static async register(userData: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await apiClient.post<RegisterResponse>('/auth/register', userData);
      
      if (response.success && response.data) {
        // Store token in API client
        apiClient.setToken(response.data.token);
        return response.data;
      }
      
      throw new Error(response.message || 'Registration failed');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Logout (client-side only)
  static logout(): void {
    apiClient.removeToken();
    localStorage.removeItem('bluespace_user');
  }

  // Get current user from localStorage
  static getCurrentUser(): User | null {
    try {
      const userStr = localStorage.getItem('bluespace_user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return !!localStorage.getItem('bluespace_token');
  }
}
