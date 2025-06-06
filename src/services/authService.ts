
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
  // TODO: Add password strength validation
  // TODO: Add email verification flow
  // TODO: Add forgot password functionality
  
  // POST /api/auth/login
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      console.log('🔐 Attempting login for:', credentials.email);
      
      const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
      
      if (response.success && response.data) {
        // Store token in API client
        apiClient.setToken(response.data.token);
        
        // TODO: Add token expiration handling
        // TODO: Add refresh token logic
        
        console.log('✅ Login successful for user:', response.data.user.name);
        return response.data;
      }
      
      throw new Error(response.message || 'Login failed');
    } catch (error) {
      console.error('❌ Login error:', error);
      
      // TODO: Add specific error handling for different scenarios
      // TODO: Add rate limiting protection
      throw error;
    }
  }

  // POST /api/auth/register
  static async register(userData: RegisterRequest): Promise<RegisterResponse> {
    try {
      console.log('📝 Attempting registration for:', userData.email);
      
      const response = await apiClient.post<RegisterResponse>('/auth/register', userData);
      
      if (response.success && response.data) {
        // Store token in API client
        apiClient.setToken(response.data.token);
        
        // TODO: Add welcome email sending
        // TODO: Add profile completion prompts
        
        console.log('✅ Registration successful for user:', response.data.user.name);
        return response.data;
      }
      
      throw new Error(response.message || 'Registration failed');
    } catch (error) {
      console.error('❌ Registration error:', error);
      
      // TODO: Handle duplicate email errors specifically
      // TODO: Add validation error display
      throw error;
    }
  }

  // Logout (client-side only)
  static logout(): void {
    console.log('🚪 Logging out user');
    
    apiClient.removeToken();
    localStorage.removeItem('bluespace_user');
    
    // TODO: Add server-side token invalidation
    // TODO: Add logout analytics tracking
  }

  // Get current user from localStorage
  static getCurrentUser(): User | null {
    try {
      const userStr = localStorage.getItem('bluespace_user');
      const user = userStr ? JSON.parse(userStr) : null;
      
      if (user) {
        console.log('👤 Retrieved current user:', user.name);
      }
      
      return user;
    } catch (error) {
      console.error('❌ Error retrieving current user:', error);
      return null;
    }
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    const isAuth = !!localStorage.getItem('bluespace_token');
    console.log('🔍 Authentication check:', isAuth ? 'Authenticated' : 'Not authenticated');
    
    // TODO: Add token expiration validation
    // TODO: Add server-side token validation
    
    return isAuth;
  }

  // TODO: Add password reset functionality
  // static async resetPassword(email: string): Promise<void> { }
  
  // TODO: Add email verification
  // static async verifyEmail(token: string): Promise<void> { }
  
  // TODO: Add profile update functionality
  // static async updateProfile(userData: Partial<User>): Promise<User> { }
}
